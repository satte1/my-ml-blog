// Helper for article pages: Code copy, syntax highlighting prep, and reading time

document.addEventListener('DOMContentLoaded', () => {
  // 1. Prepare code blocks for Prism syntax highlighting
  document.querySelectorAll('.article-body pre code').forEach(block => {
    if (!block.className || !block.className.includes('language-')) {
      block.classList.add('language-python');
    }
  });

  if (window.Prism) {
    Prism.highlightAll();
  }

  // 2. Add Copy button to all code blocks
  document.querySelectorAll('.article-body pre').forEach(pre => {
    // Avoid duplicate buttons
    if (pre.querySelector('.copy-btn')) return;

    const btn = document.createElement('button');
    btn.className = 'copy-btn';
    btn.type = 'button';
    btn.textContent = 'Copy';
    btn.setAttribute('aria-label', 'Copy code to clipboard');

    btn.addEventListener('click', async () => {
      const code = pre.querySelector('code') ? pre.querySelector('code').innerText : pre.innerText;
      try {
        await navigator.clipboard.writeText(code);
        btn.textContent = 'Copied!';
        btn.classList.add('copied');
        setTimeout(() => {
          btn.textContent = 'Copy';
          btn.classList.remove('copied');
        }, 2000);
      } catch (err) {
        btn.textContent = 'Failed';
        setTimeout(() => {
          btn.textContent = 'Copy';
        }, 2000);
      }
    });

    pre.appendChild(btn);
  });

  // 3. Calculate and display reading time
  const articleBody = document.querySelector('.article-body');
  const articleMeta = document.querySelector('.article-meta');
  if (articleBody && articleMeta) {
    const text = articleBody.innerText || '';
    const wordCount = text.trim().split(/\s+/).length;
    const readingTime = Math.max(1, Math.round(wordCount / 200));
    const timeSpan = document.createElement('span');
    timeSpan.className = 'reading-time';
    timeSpan.textContent = `${readingTime} min read`;
    articleMeta.appendChild(timeSpan);
  }
});
