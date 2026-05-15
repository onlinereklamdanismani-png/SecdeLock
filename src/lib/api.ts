export async function getPrayerTimesByCity(city: string, country: string = "Turkey") {
  try {
    const res = await fetch(
      `https://api.aladhan.com/v1/timingsByCity?city=${encodeURIComponent(
        city
      )}&country=${encodeURIComponent(country)}&method=13`
    );
    
    if (!res.ok) throw new Error("API hatası");
    
    const data = await res.json();
    const timings = data.data.timings;
    
    return {
      fajr: timings.Fajr,
      dhuhr: timings.Dhuhr,
      asr: timings.Asr,
      maghrib: timings.Maghrib,
      isha: timings.Isha,
    };
  } catch (error) {
    console.error("Namaz vakitleri çekilemedi:", error);
    return null;
  }
}

// Ses efekti için Web Audio API
function playSuccessSound() {
  if (typeof window === "undefined") return;
  try {
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContext) return;
    
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();
    
    osc.type = "sine";
    // Tatlı bir 'ding' sesi frekansları
    osc.frequency.setValueAtTime(800, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime + 0.1);
    
    gainNode.gain.setValueAtTime(0, ctx.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.15, ctx.currentTime + 0.05);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.4);
    
    osc.connect(gainNode);
    gainNode.connect(ctx.destination);
    
    osc.start();
    osc.stop(ctx.currentTime + 0.5);
  } catch (e) {
    console.error("Ses çalınamadı:", e);
  }
}

// Güvenli titreşim ve ses fonksiyonu
export function triggerHaptic(type: "light" | "medium" | "heavy" | "success" = "light") {
  if (type === "success") {
    playSuccessSound();
  }

  if (typeof window === "undefined" || !window.navigator || !window.navigator.vibrate) {
    return;
  }

  try {
    switch (type) {
      case "light":
        window.navigator.vibrate(10);
        break;
      case "medium":
        window.navigator.vibrate(30);
        break;
      case "heavy":
        window.navigator.vibrate(50);
        break;
      case "success":
        window.navigator.vibrate([30, 50, 40]);
        break;
      default:
        window.navigator.vibrate(20);
    }
  } catch (e) {
    // Tarayıcı desteklemiyorsa sessizce yoksay
  }
}
