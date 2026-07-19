/**
 * XSS 防护工具
 * 对用户输入进行过滤和转义
 */

/**
 * 转义 HTML 特殊字符
 * 把 < > & " ' / 转成 HTML 实体，防止浏览器执行恶意代码
 *
 * 示例：escapeHtml('<script>alert(1)</script>')
 * 返回：'&lt;script&gt;alert(1)&lt;/script&gt;'
 */
export function escapeHtml(str: string | null | undefined): string {
  if (!str || typeof str !== 'string') return '';

  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '/': '&#x2F;',
  };

  return str.replace(/[&<>"'/]/g, (s) => map[s] ?? s);
}

/**
 * 过滤用户输入
 * 移除 script 标签、事件属性、javascript: 链接等
 */
export function sanitizeInput(str: string | null | undefined): string {
  if (!str || typeof str !== 'string') return '';

  // 移除 <script> 标签及其内容
  let cleaned = str.replace(/<script.*?>.*?<\/script>/gi, '');

  // 移除事件属性：onclick="xxx"、onload="xxx" 等
  cleaned = cleaned.replace(/on\w+\s*=\s*["'][^"']*["']/gi, '');

  // 移除 javascript: 伪协议
  cleaned = cleaned.replace(/href\s*=\s*["']\s*javascript:.*?["']/gi, '');

  // 移除 iframe 标签
  cleaned = cleaned.replace(/<iframe.*?>.*?<\/iframe>/gi, '');

  // 去除首尾空格
  return cleaned.trim();
}