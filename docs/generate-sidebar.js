const fs = require('fs');
const path = require('path');

// ==================== 配置区域 ====================
const CONFIG = {
  // 源目录（相对于项目根目录）
  srcDir: './docs/src',
  OUTPUT_FILE: path.join(path.join(__dirname, '.vitepress'), 'sidebar-generated.json'),
  // 导航映射：目录名 -> 导航显示文本
  navMapping: {
    guide: '指南',
    api: 'API 参考',
    examples: '示例'
  },
  // 排除的文件/目录（支持正则）
  exclude: [/^_/, 'temp', '.DS_Store'],
  // 自定义排序权重（数字越小越靠前）
  sortWeights: {
    'index': 0,
    'intro': 1,
    'getting-started': 2,
    'installation': 3,
    'default': 100
  },
  // 是否自动为无首页的目录生成 index 链接
  autoIndex: true
};
// ==================== 核心函数 ====================

/**
 * 格式化文本（移除数字前缀、连接符等）
 */
function formatText(name) {
  return name
    .replace(/^\d+[.\-]\s*/, '')  // 移除 "1." 或 "1-"
    .replace(/\.md$/i, '')
    .replace(/[-_]/g, ' ')        // 连字符/下划线转空格
    .replace(/\s+/g, ' ')         // 多个空格合并
    .trim();
}
function formatName(name) {
  // 移除数字前缀和文件扩展名，用于显示文本
  return name
    .replace(/^\d+-/, '') // 移除 1- 这样的前缀
    .replace(/\.md$/, '')
    .replace(/-/g, ' ')
    .replace(/\b\w/g, s => s.toUpperCase()); // 首字母大写
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
/**
 * 获取文件排序权重
 */
function getSortWeight(filename) {
  const cleanName = filename.replace(/\.md$/i, '').toLowerCase();
  return CONFIG.sortWeights[cleanName] ?? CONFIG.sortWeights.default;
}

/**
 * 检查是否应排除
 */
function shouldExclude(name) {
  return CONFIG.exclude.some(pattern => {
    if (pattern instanceof RegExp) return pattern.test(name);
    return name === pattern;
  });
}

/**
 * 递归扫描目录，生成层级化 sidebar 配置
 */
function scanDirectory(dir, basePath = '') {
  if (!fs.existsSync(dir)) {
    console.warn(`⚠️  目录不存在: ${dir}`);
    return [];
  }

  const items = fs.readdirSync(dir, { withFileTypes: true });

  // 过滤排除项
  const filteredItems = items.filter(item => !shouldExclude(item.name));

  // 分区处理：目录在前，文件在后
  const directories = filteredItems.filter(i => i.isDirectory());
  const files = filteredItems.filter(i => i.isFile() && i.name.endsWith('.md'));

  // 排序
  directories.sort((a, b) => a.name.localeCompare(b.name));
  files.sort((a, b) => getSortWeight(a.name) - getSortWeight(b.name));

  const result = [];

  // 处理子目录
  for (const item of directories) {
    const fullPath = path.join(dir, item.name);
    const relativePath = path.join(basePath, item.name);
    const children = scanDirectory(fullPath, relativePath);

    if (children.length > 0) {
      result.push({
        text: formatText(item.name),
        collapsible: true, // 可折叠
        items: children
      });
    }
  }

  // 处理 Markdown 文件
  for (const item of files) {
    const fileName = item.name.replace(/\.md$/i, '');
    const linkPath = path.join(basePath, fileName).replace(/\\/g, '/');
    const fullPath = path.join(dir, item.name);

    let displayText = formatText(fileName); // 默认使用格式化后的文件名

    try {
      const content = fs.readFileSync(fullPath, 'utf-8');
      displayText = extractTitleFromContent(content, formatName(item.name));
    } catch (e) {
      console.warn(`⚠️  无法读取文件 ${fullPath}: ${e.message}`);
    }
    result.push({
      text: displayText,
      link: `/${linkPath}`
    });
  }
  return result;
}

/**
 * 生成导航栏配置
 */
function generateNavConfig() {
  const navDir = CONFIG.srcDir;
  if (!fs.existsSync(navDir)) return [];

  const items = fs.readdirSync(navDir, { withFileTypes: true });
  const nav = [];

  for (const item of items) {
    if (item.isDirectory() && !shouldExclude(item.name)) {
      const displayName = CONFIG.navMapping[item.name] || formatText(item.name);
      nav.push({
        text: displayName,
        link: `/${item.name}/`
      });
    }
  }

  return nav;
}

/**
 * 生成完整的 sidebar 配置
 */
function generateSidebarConfig() {
  const sidebars = {};
  const navItems = generateNavConfig();

  for (const navItem of navItems) {
    const navKey = navItem.link.replace(/\//g, ''); // e.g., "guide"
    const sidebarKey = navItem.link; // e.g., "/guide/"

    const sidebarItems = scanDirectory(
      path.join(CONFIG.srcDir, navKey),
      navKey
    );

    // 只有当有实际内容时才添加
    if (sidebarItems.length > 0) {
      sidebars[sidebarKey] = sidebarItems;
    }
  }

  return { nav: navItems, sidebars };
}
try {
  const { nav, sidebars } = generateSidebarConfig();


  const combined = {
    nav,
    sidebars
  };
  fs.writeFileSync(CONFIG.OUTPUT_FILE, JSON.stringify(combined, null, 2));
  console.log('✅ 侧边栏生成成功！');
} catch (error) {
  console.error('❌ 生成失败:', error);
}
