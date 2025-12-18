const fs = require('fs');
const path = require('path');

// 配置
const DOCS_DIR = path.join(__dirname, 'src');
const OUTPUT_DIR = path.join(__dirname, '.vitepress');
const OUTPUT_FILE = path.join(OUTPUT_DIR, 'sidebar-generated.json');

// 确保输出目录存在
function ensureDirectoryExists(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`✅ 已创建目录: ${dir}`);
  }
}

/**
 * 从markdown文件内容中提取第一个一级标题
 * @param {string} content - 文件内容
 * @param {string} fallback - 如果找不到标题时的回退文本
 * @returns {string} 提取的标题或回退文本
 */
function extractTitleFromContent(content, fallback) {
  // 匹配行首的 # 标题
  const titleMatch = content.match(/^#\s+(.+)$/m);

  if (titleMatch) {
    let title = titleMatch[1].trim();

    // 清理标题中的Markdown链接格式：[显示文本](链接) → 显示文本
    const linkMatch = title.match(/^$$(.+?)$$$$.+?$$$/);
    if (linkMatch) {
      title = linkMatch[1];
    }

    // 清理标题中的HTML标签（如果有）
    title = title.replace(/<[^>]+>/g, '');

    return title;
  }

  return fallback;
}

// 递归读取目录生成侧边栏
function generateSidebar(dir, basePath = '') {
  const items = [];
  const obitems = {}
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  // 按文件夹优先，然后文件名排序
  entries.sort((a, b) => {
    if (a.isDirectory() && !b.isDirectory()) return -1;
    if (!a.isDirectory() && b.isDirectory()) return 1;
    return a.name.localeCompare(b.name);
  });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    const relativePath = path.join(basePath, entry.name);
    // 跳过隐藏文件和 .vitepress 目录
    console.log(entry);
    
    if (entry.name.startsWith('.') || entry.name === 'node_modules') continue;
    if (entry.isDirectory()) {
      // 递归处理子目录
      const { items: children } = generateSidebar(fullPath, relativePath);
      if (children.length > 0) {
        let a = ''
        if (entry.name == 'tech') {
          a = '问题本'
        } else {
          a = entry.name
        }
        items.push({
          text: formatName(a),
          items: children
        });
        obitems[`/${formatName(a)}/`] = [
          {
            text: formatName(a),
            items: children
          }
        ]

      }
    } else if (entry.isFile() && entry.name.endsWith('.md')) {
      // 🔥 关键修改：跳过 src 根目录下的 .md 文件
      if (basePath === '') {
        continue;
      }
      // 读取文件内容以提取标题
      let displayText = formatName(entry.name); // 默认使用格式化后的文件名

      try {
        const content = fs.readFileSync(fullPath, 'utf-8');
        displayText = extractTitleFromContent(content, formatName(entry.name));
      } catch (e) {
        console.warn(`⚠️  无法读取文件 ${fullPath}: ${e.message}`);
      }

      // 添加 Markdown 文件
      const link = normalizePath(relativePath)
      items.push({
        text: displayText,
        link: `/${link}` // 确保路径以 / 开头
      });
    }
  }
  return { items, obitems };
}
function normalizePath(filePath) {
  return filePath.replace(/\\/g, '/');
}

function formatName(name) {
  // 移除数字前缀和文件扩展名，用于显示文本
  return name
    .replace(/^\d+-/, '') // 移除 1- 这样的前缀
    .replace(/\.md$/, '')
    .replace(/-/g, ' ')
    .replace(/\b\w/g, s => s.toUpperCase()); // 首字母大写
}

// 执行生成
try {
  ensureDirectoryExists(OUTPUT_DIR); // 确保输出目录存在
  const { items, obitems } = generateSidebar(DOCS_DIR);
  items.unshift({ text: '持续更新/搬迁中 · · ·', })
  obitems["/"] = [{
    text: '个人简历',
    items: []
  },
  {
    text: '欢迎光临 ! ! !',
    items: []
  },]
  obitems["/问题本/"].unshift({
    text: '持续更新/搬迁中 · · ·',
  })
  const combined = {
    items: items,
    obitems: obitems
  };
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(combined, null, 2));
  console.log('✅ 侧边栏生成成功！');
  console.log(`📁 输出文件: ${OUTPUT_FILE}`);
} catch (error) {
  console.error('❌ 生成失败:', error);
}
