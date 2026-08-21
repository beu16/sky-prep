// AI Voice Engine: Provides ultra-smooth, lifelike audio narration
// Calibrated specifically for airline interview coaches, examiners, and candidates.

export interface VoicePlaybackState {
  isPlaying: boolean;
  isPaused: boolean;
  currentText: string;
  activeId: string | null;
  rate: number;
}

class AIVoiceEngine {
  private synth: SpeechSynthesis | null = null;
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private preferredVoice: SpeechSynthesisVoice | null = null;
  private listeners: Set<(state: VoicePlaybackState) => void> = new Set();
  private state: VoicePlaybackState = {
    isPlaying: false,
    isPaused: false,
    currentText: '',
    activeId: null,
    rate: 0.95, // Optimized speed for aviation clarity and executive cadence
  };

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.synth = window.speechSynthesis;
      this.initVoices();
      if (this.synth.onvoiceschanged !== undefined) {
        this.synth.onvoiceschanged = () => this.initVoices();
      }
    }
  }

  private initVoices() {
    if (!this.synth) return;
    const voices = this.synth.getVoices();
    if (!voices || voices.length === 0) return;

    // Search for ultra-realistic / natural neural voices in order of priority:
    const prioritizedVoicePatterns = [
      /natural/i,
      /google us english/i,
      /google uk english female/i,
      /samantha/i,
      /daniel/i,
      /karen/i,
      /moira/i,
      /zira/i,
      /en-us/i,
      /en-gb/i,
    ];

    for (const pattern of prioritizedVoicePatterns) {
      const match = voices.find(v => pattern.test(v.name) || pattern.test(v.voiceURI));
      if (match) {
        this.preferredVoice = match;
        break;
      }
    }

    if (!this.preferredVoice) {
      // Fallback to any English voice
      this.preferredVoice = voices.find(v => v.lang.startsWith('en')) || voices[0] || null;
    }
  }

  public getVoices(): SpeechSynthesisVoice[] {
    if (!this.synth) return [];
    return this.synth.getVoices();
  }

  public setVoice(voice: SpeechSynthesisVoice) {
    this.preferredVoice = voice;
  }

  public setRate(rate: number) {
    this.state.rate = Math.max(0.7, Math.min(1.3, rate));
    this.notify();
  }

  public subscribe(listener: (state: VoicePlaybackState) => void): () => void {
    this.listeners.add(listener);
    listener(this.state);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notify() {
    this.listeners.forEach(listener => listener({ ...this.state }));
  }

  public speak(id: string, text: string, onEnd?: () => void) {
    if (!this.synth) return;

    // Stop current speech
    this.stop();

    // Clean text for speech clarity
    const cleanedText = text
      .replace(/[*_#`]/g, '')
      .replace(/S\s*-\s*Situation:/gi, 'Situation. ')
      .replace(/T\s*-\s*Task:/gi, 'Task. ')
      .replace(/A\s*-\s*Action:/gi, 'Action. ')
      .replace(/R\s*-\s*Result:/gi, 'Result. ')
      .replace(/\s+/g, ' ')
      .trim();

    if (!cleanedText) return;

    const utterance = new SpeechSynthesisUtterance(cleanedText);
    if (!this.preferredVoice) {
      this.initVoices();
    }
    if (this.preferredVoice) {
      utterance.voice = this.preferredVoice;
    }

    // Natural airline examiner cadence
    utterance.rate = this.state.rate;
    utterance.pitch = 1.0;
    utterance.volume = 1.0;

    utterance.onstart = () => {
      this.state.isPlaying = true;
      this.state.isPaused = false;
      this.state.currentText = cleanedText;
      this.state.activeId = id;
      this.notify();
    };

    utterance.onend = () => {
      this.state.isPlaying = false;
      this.state.isPaused = false;
      this.state.currentText = '';
      this.state.activeId = null;
      this.notify();
      if (onEnd) onEnd();
    };

    utterance.onerror = (e) => {
      console.warn('Speech synthesis error or cancelled:', e);
      this.state.isPlaying = false;
      this.state.isPaused = false;
      this.state.currentText = '';
      this.state.activeId = null;
      this.notify();
    };

    this.currentUtterance = utterance;
    this.synth.speak(utterance);
  }

  public pause() {
    if (this.synth && this.state.isPlaying && !this.state.isPaused) {
      this.synth.pause();
      this.state.isPaused = true;
      this.notify();
    }
  }

  public resume() {
    if (this.synth && this.state.isPlaying && this.state.isPaused) {
      this.synth.resume();
      this.state.isPaused = false;
      this.notify();
    }
  }

  public stop() {
    if (this.synth) {
      this.synth.cancel();
      this.state.isPlaying = false;
      this.state.isPaused = false;
      this.state.currentText = '';
      this.state.activeId = null;
      this.notify();
    }
  }

  public isSpeaking(id?: string): boolean {
    if (!id) return this.state.isPlaying;
    return this.state.isPlaying && this.state.activeId === id;
  }
}

export const aiVoice = new AIVoiceEngine();
