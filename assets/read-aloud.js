// Read Aloud (Web Speech API) - simple, client-side TTS for accessibility
// Adds a floating control to pages with class "reading" and reads the main article text.
(function () {
  if (!('speechSynthesis' in window)) return;

  document.addEventListener('DOMContentLoaded', () => {
    if (!document.querySelector('.reading')) return;

    const getText = () => {
      const story = document.querySelector('article.story');
      if (!story) return document.body.innerText;
      // prefer reading visible text and exclude navigation
      return story.innerText.trim();
    };

    // Create controls
    const bar = document.createElement('div');
    bar.className = 'read-controls';
    bar.innerHTML = `
      <button class="ra-play" title="Reproducir">▶</button>
      <button class="ra-pause" title="Pausar">⏸</button>
      <button class="ra-stop" title="Detener">■</button>
      <label class="ra-voice">Voz <select class="ra-voices"></select></label>
      <label class="ra-rate">Velocidad <input class="ra-rate-input" type="range" min="0.6" max="1.6" step="0.1" value="1"></label>
    `;
    document.body.appendChild(bar);

    // Styles (small, injected)
    const style = document.createElement('style');
    style.textContent = `
      .read-controls { position: fixed; right: 1rem; bottom: 1rem; z-index: 9999; background: rgba(2,6,23,0.72); color: #fff; padding: 0.5rem 0.75rem; border-radius: 8px; display: flex; gap: 0.5rem; align-items: center; font-family: system-ui, sans-serif; }
      .read-controls button { background: transparent; color: inherit; border: none; font-size: 1rem; cursor: pointer; }
      .read-controls label { display: flex; align-items: center; gap: 0.4rem; font-size: 0.85rem; color: #dbeafe; }
      .read-controls select, .read-controls input[type=range] { height: 28px; }
    `;
    document.head.appendChild(style);

    const voicesSelect = bar.querySelector('.ra-voices');
    const rateInput = bar.querySelector('.ra-rate-input');
    const playBtn = bar.querySelector('.ra-play');
    const pauseBtn = bar.querySelector('.ra-pause');
    const stopBtn = bar.querySelector('.ra-stop');

    let utterance;
    let speaking = false;

    function populateVoices() {
      const voices = speechSynthesis.getVoices();
      voicesSelect.innerHTML = '';
      voices.forEach(v => {
        const opt = document.createElement('option');
        opt.value = v.name;
        opt.textContent = `${v.name} (${v.lang})`;
        voicesSelect.appendChild(opt);
      });
      // select a Spanish voice if available
      const preferred = voices.find(v => /es(-|$)/i.test(v.lang)) || voices[0];
      if (preferred) voicesSelect.value = preferred.name;
    }

    populateVoices();
    window.speechSynthesis.onvoiceschanged = populateVoices;

    function startReading() {
      if (speaking) return;
      const text = getText();
      if (!text) return;
      utterance = new SpeechSynthesisUtterance(text);
      const chosen = speechSynthesis.getVoices().find(v => v.name === voicesSelect.value);
      if (chosen) utterance.voice = chosen;
      utterance.rate = parseFloat(rateInput.value) || 1;
      utterance.onend = () => { speaking = false; };
      speechSynthesis.speak(utterance);
      speaking = true;
    }

    function pauseReading() {
      if (!speaking) return;
      if (speechSynthesis.paused) speechSynthesis.resume();
      else speechSynthesis.pause();
    }

    function stopReading() {
      if (!speaking) return;
      speechSynthesis.cancel();
      speaking = false;
    }

    playBtn.addEventListener('click', startReading);
    pauseBtn.addEventListener('click', pauseReading);
    stopBtn.addEventListener('click', stopReading);

    // keyboard accessibility: space toggles play/pause when focused
    bar.addEventListener('keydown', (e) => {
      if (e.key === ' ' || e.key === 'Spacebar') { e.preventDefault(); startReading(); }
    });
  });
})();
