(function () {
  const items = [
    { hot: 'скоро', text: '11 мая · старт health os lab #2' },
    { text: '25 апреля · костёр «мужской круг» — application' },
    { text: '5 мая · открытие creative os — усилитель твоего голоса' },
    { text: '6 мая · протагонист — Вадим' },
    { text: '9 июня · открытие спринта «родительство»' },
  ];

  const HEIGHT = 34;

  const css = `
    .blr-ticker {
      position: fixed;
      top: 0; left: 0; right: 0;
      height: ${HEIGHT}px;
      background: #ffdd00;
      color: #0d0d0d;
      overflow: hidden;
      border-bottom: 1px solid #0d0d0d;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      z-index: 9999;
      display: flex;
      align-items: center;
    }
    .blr-ticker-track {
      display: flex;
      gap: 0;
      white-space: nowrap;
      animation: blr-ticker-scroll 38s linear infinite;
      width: max-content;
      will-change: transform;
    }
    .blr-ticker-item {
      font-size: 12px;
      font-weight: 700;
      text-transform: lowercase;
      letter-spacing: 0.3px;
      display: inline-flex;
      align-items: center;
      gap: 10px;
      padding-right: 48px;
      position: relative;
    }
    .blr-ticker-item::after {
      content: "●";
      position: absolute;
      right: 18px;
      font-size: 6px;
      opacity: 0.45;
      top: 50%;
      transform: translateY(-50%);
    }
    .blr-ticker-item .blr-hot {
      background: #0d0d0d;
      color: #ffdd00;
      padding: 2px 8px;
      border-radius: 4px;
      font-size: 10px;
      font-weight: 700;
    }
    .blr-ticker:hover .blr-ticker-track { animation-play-state: paused; }
    @keyframes blr-ticker-scroll {
      0% { transform: translateX(0); }
      100% { transform: translateX(-50%); }
    }
    @media (prefers-reduced-motion: reduce) {
      .blr-ticker-track { animation-duration: 120s; }
    }

    /* сдвиг существующих шапок и сайдбаров на высоту тикера */
    body { padding-top: ${HEIGHT}px; }
    .nav[class~="nav"] { top: ${HEIGHT}px !important; }
    .sidebar { top: ${HEIGHT}px !important; height: calc(100vh - ${HEIGHT}px) !important; }
    /* для sticky-шапки календаря на community.html */
    .day-header-row { top: ${HEIGHT + 56}px !important; }
  `;

  function renderItem(it) {
    const hot = it.hot ? `<span class="blr-hot">${it.hot}</span>` : '';
    return `<span class="blr-ticker-item">${hot}${it.text}</span>`;
  }

  const oneCycle = items.map(renderItem).join('');
  const html = `
    <div class="blr-ticker" aria-label="анонсы комьюнити">
      <div class="blr-ticker-track">${oneCycle}${oneCycle}</div>
    </div>
  `;

  const style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);

  const wrapper = document.createElement('div');
  wrapper.innerHTML = html.trim();
  document.body.insertBefore(wrapper.firstChild, document.body.firstChild);
})();
