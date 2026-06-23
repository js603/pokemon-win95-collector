import React, { useState, useEffect } from 'react';

// ==========================================
// 1. 공통 상수 및 유틸리티
// ==========================================
const POKEMON_NAMES_KO = {
  1: "이상해씨", 2: "이상해풀", 3: "이상해꽃", 4: "파이리", 5: "리자드", 6: "리자몽",
  7: "꼬부기", 8: "어니부기", 9: "거북왕", 10: "캐터피", 11: "단데기", 12: "버터플",
  13: "뿔충이", 14: "딱충이", 15: "독침붕", 16: "구구", 17: "피죤", 18: "피죤투",
  19: "꼬렛", 20: "레트라", 21: "깨비참", 22: "깨비드릴조", 23: "아보", 24: "아보크",
  25: "피카츄", 26: "라이츄", 27: "모래두지", 28: "고지", 29: "니드런♀", 30: "니드리나",
  31: "니드퀸", 32: "니드런♂", 33: "니드리노", 34: "니드킹", 35: "삐삐", 36: "픽시",
  37: "식스테일", 38: "나인테일", 39: "푸린", 40: "푸크린", 41: "주뱃", 42: "골뱃",
  43: "뚜벅초", 44: "냄새꼬", 45: "라플레시아", 46: "파라스", 47: "파라섹트", 48: "콘팡",
  49: "도나리", 50: "디그다", 51: "닥트리오", 52: "나옹", 53: "페르시온", 54: "고라파덕",
  55: "골덕", 56: "망키", 57: "성원숭", 58: "가디", 59: "윈디", 60: "발챙이",
  61: "슈륙챙이", 62: "강챙이", 63: "케이시", 64: "윤겔라", 65: "후딘", 66: "알통몬",
  67: "근육몬", 68: "괴력몬", 69: "모다피", 70: "우츠동", 71: "우츠보트", 72: "왕눈해",
  73: "독파리", 74: "꼬마돌", 75: "데구리", 76: "딱구리", 77: "포니타", 78: "날쌩마",
  79: "야돈", 80: "야도란", 81: "코일", 82: "레어코일", 83: "파오리", 84: "두두",
  85: "두트리오", 86: "쥬쥬", 87: "쥬레곤", 88: "질퍽이", 89: "질뻐기", 90: "셀러",
  91: "파르셀", 92: "고스", 93: "고우스트", 94: "팬텀", 95: "롱스톤", 96: "슬리프",
  97: "슬리퍼", 98: "크랩", 99: "킹크랩", 100: "찌리리공", 101: "붐볼", 102: "아라리",
  103: "나시", 104: "탕구리", 105: "텅구리", 106: "시라소몬", 107: "홍수몬", 108: "내루미",
  109: "또가스", 110: "또도가스", 111: "뿔카노", 112: "코뿌리", 113: "럭키", 114: "덩쿠리",
  115: "캥카", 116: "쏘드라", 117: "시드라", 118: "콘치", 119: "왕콘치", 120: "별가사리",
  121: "아쿠스타", 122: "마임맨", 123: "스라크", 124: "루주라", 125: "에레브", 126: "마그마",
  127: "쁘사이저", 128: "켄타로스", 129: "잉어킹", 130: "갸라도스", 131: "라프라스", 132: "메타몽",
  133: "이브이", 134: "샤미드", 135: "쥬피썬더", 136: "부스터", 137: "폴리곤", 138: "암나이트",
  139: "암스타", 140: "투구", 141: "투구푸스", 142: "프테라", 143: "잠만보", 144: "프리져",
  145: "썬더", 146: "파이어", 147: "미뇽", 148: "신뇽", 149: "망나뇽", 150: "뮤츠", 151: "뮤"
};

const EVOLUTION_TABLE = {
  1: { level: 16, targetId: 2 }, 2: { level: 32, targetId: 3 },
  4: { level: 16, targetId: 5 }, 5: { level: 36, targetId: 6 },
  7: { level: 16, targetId: 8 }, 8: { level: 36, targetId: 9 },
  10: { level: 7, targetId: 11 }, 11: { level: 10, targetId: 12 },
  13: { level: 7, targetId: 14 }, 14: { level: 10, targetId: 15 },
  16: { level: 18, targetId: 17 }, 17: { level: 36, targetId: 18 },
  19: { level: 20, targetId: 20 }, 21: { level: 20, targetId: 22 },
  23: { level: 22, targetId: 24 }, 25: { level: 25, targetId: 26 },
  27: { level: 22, targetId: 28 }, 29: { level: 16, targetId: 30 },
  30: { level: 36, targetId: 31 }, 32: { level: 16, targetId: 33 },
  33: { level: 36, targetId: 34 }, 41: { level: 22, targetId: 42 },
  43: { level: 21, targetId: 44 }, 44: { level: 36, targetId: 45 },
  46: { level: 24, targetId: 47 }, 48: { level: 31, targetId: 49 },
  50: { level: 26, targetId: 51 }, 52: { level: 28, targetId: 53 },
  54: { level: 33, targetId: 55 }, 56: { level: 28, targetId: 57 },
  60: { level: 25, targetId: 61 }, 61: { level: 36, targetId: 62 },
  63: { level: 16, targetId: 64 }, 64: { level: 36, targetId: 65 },
  66: { level: 28, targetId: 67 }, 67: { level: 40, targetId: 68 },
  69: { level: 21, targetId: 70 }, 70: { level: 36, targetId: 71 },
  72: { level: 30, targetId: 73 }, 74: { level: 25, targetId: 75 },
  75: { level: 40, targetId: 76 }, 77: { level: 40, targetId: 78 }, 
  79: { level: 37, targetId: 80 }, 81: { level: 30, targetId: 82 }, 
  84: { level: 31, targetId: 85 }, 86: { level: 34, targetId: 87 }, 
  88: { level: 38, targetId: 89 }, 92: { level: 25, targetId: 93 }, 
  93: { level: 40, targetId: 94 }, 96: { level: 26, targetId: 97 }, 
  98: { level: 28, targetId: 99 }, 100: { level: 30, targetId: 101 }, 
  104: { level: 28, targetId: 105 }, 109: { level: 35, targetId: 110 }, 
  111: { level: 42, targetId: 112 }, 116: { level: 32, targetId: 117 }, 
  118: { level: 33, targetId: 119 }, 129: { level: 20, targetId: 130 }, 
  138: { level: 40, targetId: 139 }, 140: { level: 40, targetId: 141 }, 
  147: { level: 30, targetId: 148 }, 148: { level: 55, targetId: 149 }
};

const MBTI_POKEMON_MAP = {
  ESTJ: 128, ESTP: 100, ESFJ: 113, ESFP: 39,
  ENTJ: 6,   ENTP: 94,  ENFJ: 59,  ENFP: 25,
  ISTJ: 1,   ISTP: 123, ISFJ: 4,   ISFP: 133,
  INTJ: 150, INTP: 64,  INFJ: 7,   INFP: 43,
};

const PHYSICAL_TYPES = ["normal", "fighting", "flying", "poison", "ground", "rock", "bug", "ghost", "steel"];

const TYPE_CHART = {
  normal: { rock: 0.5, ghost: 0, steel: 0.5 },
  fire: { fire: 0.5, water: 0.5, grass: 2, ice: 2, bug: 2, rock: 0.5, dragon: 0.5, steel: 2 },
  water: { fire: 2, water: 0.5, grass: 0.5, ground: 2, rock: 2, dragon: 0.5 },
  grass: { fire: 0.5, water: 2, grass: 0.5, poison: 0.5, ground: 2, flying: 0.5, bug: 0.5, rock: 2, dragon: 0.5, steel: 0.5 },
  electric: { water: 2, grass: 0.5, electric: 0.5, ground: 0, flying: 2, dragon: 0.5 },
  ice: { fire: 0.5, water: 0.5, grass: 2, ice: 0.5, ground: 2, flying: 2, dragon: 2, steel: 0.5 },
  fighting: { normal: 2, ice: 2, poison: 0.5, flying: 0.5, psychic: 0.5, bug: 0.5, rock: 2, ghost: 0, dark: 2, steel: 2 },
  poison: { grass: 2, poison: 0.5, ground: 0.5, rock: 0.5, ghost: 0.5, steel: 0 },
  ground: { fire: 2, grass: 0.5, electric: 2, poison: 2, flying: 0, bug: 0.5, rock: 2, steel: 2 },
  flying: { grass: 2, electric: 0.5, fighting: 2, bug: 2, rock: 0.5, steel: 0.5 },
  psychic: { fighting: 2, poison: 2, psychic: 0.5, dark: 0, steel: 0.5 },
  bug: { fire: 0.5, grass: 2, fighting: 0.5, poison: 0.5, flying: 0.5, psychic: 2, ghost: 0.5, dark: 2, steel: 0.5 },
  rock: { fire: 2, ice: 2, fighting: 0.5, ground: 0.5, flying: 2, bug: 2, steel: 0.5 },
  ghost: { normal: 0, psychic: 2, ghost: 2, dark: 0.5, steel: 0.5 },
  dragon: { dragon: 2, steel: 0.5 },
  dark: { fighting: 0.5, psychic: 2, ghost: 2, dark: 0.5, steel: 0.5 },
  steel: { fire: 0.5, water: 0.5, electric: 0.5, ice: 2, rock: 2, steel: 0.5 }
};

const STATUS_MAP = { paralysis: '마비', burn: '화상', poison: '독', sleep: '수면', freeze: '얼음' };
const STAT_MAP = { attack: '공격력', defense: '방어력', 'special-attack': '특수공격', 'special-defense': '특수방어', speed: '스피드', accuracy: '명중률', evasion: '회피율' };

const getEffectiveness = (atkType, defTypes) => {
  let multiplier = 1;
  defTypes.forEach(defType => {
    if (TYPE_CHART[atkType] && TYPE_CHART[atkType][defType] !== undefined) {
      multiplier *= TYPE_CHART[atkType][defType];
    }
  });
  return multiplier;
};

const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const playSfx = (type) => {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    
    switch(type) {
      case 'click': {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'square';
        osc.frequency.setValueAtTime(550, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(120, ctx.currentTime + 0.08);
        gain.gain.setValueAtTime(0.06, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.08);
        osc.connect(gain); gain.connect(ctx.destination);
        osc.start(); osc.stop(ctx.currentTime + 0.1);
        break;
      }
      case 'success': {
        const now = ctx.currentTime;
        const notes = [293.66, 349.23, 440.00, 587.33];
        notes.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, now + idx * 0.08);
          gain.gain.setValueAtTime(0.08, now + idx * 0.08);
          gain.gain.exponentialRampToValueAtTime(0.01, now + idx * 0.08 + 0.15);
          osc.connect(gain); gain.connect(ctx.destination);
          osc.start(now + idx * 0.08); osc.stop(now + idx * 0.08 + 0.18);
        });
        break;
      }
      case 'fail': {
        const now = ctx.currentTime;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(150, now);
        osc.frequency.linearRampToValueAtTime(70, now + 0.35);
        gain.gain.setValueAtTime(0.1, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.4);
        osc.connect(gain); gain.connect(ctx.destination);
        osc.start(); osc.stop(now + 0.4);
        break;
      }
      case 'shake': {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(100, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(240, ctx.currentTime + 0.12);
        gain.gain.setValueAtTime(0.08, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.12);
        osc.connect(gain); gain.connect(ctx.destination);
        osc.start(); osc.stop(ctx.currentTime + 0.12);
        break;
      }
      case 'hit': {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(100, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(40, ctx.currentTime + 0.1);
        gain.gain.setValueAtTime(0.1, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);
        osc.connect(gain); gain.connect(ctx.destination);
        osc.start(); osc.stop(ctx.currentTime + 0.1);
        break;
      }
      default: break;
    }
  } catch (e) {
    console.warn("Web Audio API error", e);
  }
};


// ==========================================
// 2. 데이터 Fetcher (상태이상/변화기 수용)
// ==========================================
const fetchPokemonData = async (id, level) => {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  const data = await res.json();
  
  let movePool = data.moves.map(m => m.move).sort(() => Math.random() - 0.5).slice(0, 15);
  let selectedMoves = [];
  
  for (let m of movePool) {
    if (selectedMoves.length >= 4) break;
    try {
      const moveRes = await fetch(m.url);
      const moveData = await moveRes.json();
      
      // 공격기이거나, 변화기(status)인 경우 모두 수용
      if (moveData.power > 0 || (moveData.damage_class && moveData.damage_class.name === 'status')) {
        selectedMoves.push({
          name: moveData.names.find(n => n.language.name === 'ko')?.name || m.name,
          power: moveData.power || 0,
          type: moveData.type.name,
          accuracy: moveData.accuracy || 100,
          pp: moveData.pp || 15,
          current_pp: moveData.pp || 15,
          stat_changes: moveData.stat_changes || [],
          target: moveData.target.name,
          meta: moveData.meta || {}
        });
      }
    } catch (e) { continue; }
  }
  
  if (selectedMoves.length === 0) {
    selectedMoves.push({ name: "몸통박치기", power: 40, type: "normal", accuracy: 100, pp: 35, current_pp: 35, stat_changes: [], target: 'selected-pokemon', meta: {} });
  }

  const maxHp = Math.floor((data.stats[0].base_stat * 2 * level) / 100) + level + 10;
  
  return {
    id: id,
    name: POKEMON_NAMES_KO[id] || data.name,
    spriteFront: data.sprites.front_default,
    spriteBack: data.sprites.back_default || data.sprites.front_default,
    types: data.types.map(t => t.type.name),
    level: level,
    maxHp: maxHp,
    hp: maxHp,
    status: null, // 상태이상 (paralysis, burn, poison 등)
    attack: Math.floor((data.stats[1].base_stat * 2 * level) / 100) + 5,
    defense: Math.floor((data.stats[2].base_stat * 2 * level) / 100) + 5,
    spAtk: Math.floor((data.stats[3].base_stat * 2 * level) / 100) + 5,
    spDef: Math.floor((data.stats[4].base_stat * 2 * level) / 100) + 5,
    speed: Math.floor((data.stats[5].base_stat * 2 * level) / 100) + 5,
    exp: 0,
    maxExp: level * 10,
    moves: selectedMoves
  };
};

const checkNewLearnedMove = async (pokemonId, level) => {
  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
    const data = await res.json();
    let newMoveObj = null;
    
    for (let m of data.moves) {
      const detail = m.version_group_details.find(d => d.move_learn_method.name === 'level-up' && d.level_learned_at === level);
      if (detail) {
        const moveRes = await fetch(m.move.url);
        const moveData = await moveRes.json();
        if (moveData.power > 0 || (moveData.damage_class && moveData.damage_class.name === 'status')) {
            newMoveObj = {
                name: moveData.names.find(n => n.language.name === 'ko')?.name || m.move.name,
                power: moveData.power || 0,
                type: moveData.type.name,
                accuracy: moveData.accuracy || 100,
                pp: moveData.pp || 15,
                current_pp: moveData.pp || 15,
                stat_changes: moveData.stat_changes || [],
                target: moveData.target.name,
                meta: moveData.meta || {}
            };
            break;
        }
      }
    }
    return newMoveObj;
  } catch(e) { return null; }
};


// ==========================================
// 3. 육성 모드 (Raise Mode) 컴포넌트
// ==========================================
const MbtiTest = ({ onComplete }) => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({ E:0, I:0, S:0, N:0, T:0, F:0, J:0, P:0 });
  
  const questions = [
    { q: "주말에 시간이 생겼습니다. 당신의 선택은?", a: { text: "친구들과 밖에서 놀며 에너지를 얻는다", type: "E" }, b: { text: "집에서 혼자 푹 쉬며 에너지를 충전한다", type: "I" } },
    { q: "포켓몬 배틀 중 처음 보는 상대가 나왔습니다.", a: { text: "지금까지의 경험을 바탕으로 상성을 유추한다", type: "S" }, b: { text: "직감적으로 이 기술이 통할 것 같아 바로 지시한다", type: "N" } },
    { q: "친구가 체육관 관장에게 져서 우울해합니다.", a: { text: "왜 졌는지 분석하고 다음 전략을 같이 짜준다", type: "T" }, b: { text: "많이 속상하겠다며 먼저 공감하고 위로해준다", type: "F" } },
    { q: "새로운 마을로 여행을 떠나기 전 당신은?", a: { text: "지도와 아이템, 동선을 완벽하게 계획한다", type: "J" }, b: { text: "발길이 닿는 대로 모험을 시작한다", type: "P" } }
  ];

  const handleAnswer = (type) => {
    playSfx('click');
    const newAnswers = { ...answers, [type]: answers[type] + 1 };
    setAnswers(newAnswers);
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      const mbti = 
        (newAnswers.E >= newAnswers.I ? 'E' : 'I') +
        (newAnswers.S >= newAnswers.N ? 'S' : 'N') +
        (newAnswers.T >= newAnswers.F ? 'T' : 'F') +
        (newAnswers.J >= newAnswers.P ? 'J' : 'P');
      onComplete(mbti);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full p-4">
      <div className="win95-outset bg-[#c0c0c0] w-full max-w-sm flex flex-col shadow-xl">
        <div className="win95-titlebar p-1 flex justify-between items-center"><span className="text-xs font-bold pl-1">오박사의 성향 테스트.exe</span></div>
        <div className="p-4 bg-[#e0e0e0] flex flex-col gap-4">
          <div className="win95-inset bg-white p-3 text-xs font-bold leading-relaxed min-h-[60px]">{questions[step].q}</div>
          <div className="flex flex-col gap-2">
            <button onClick={() => handleAnswer(questions[step].a.type)} className="win95-outset bg-[#c0c0c0] hover:bg-white text-xs font-bold p-3 text-left active:win95-inset transition-colors">1. {questions[step].a.text}</button>
            <button onClick={() => handleAnswer(questions[step].b.type)} className="win95-outset bg-[#c0c0c0] hover:bg-white text-xs font-bold p-3 text-left active:win95-inset transition-colors">2. {questions[step].b.text}</button>
          </div>
          <div className="text-right text-[10px] mt-2 font-mono text-gray-600">진행도: {step + 1} / 4</div>
        </div>
      </div>
    </div>
  );
};

const TypeWriter = ({ text, onComplete, speed = 30 }) => {
  const [displayed, setDisplayed] = useState("");
  useEffect(() => {
    setDisplayed("");
    let i = 0;
    const timer = setInterval(() => {
      setDisplayed(text.slice(0, i + 1));
      i++;
      if (i >= text.length) {
        clearInterval(timer);
        if (onComplete) onComplete();
      }
    }, speed);
    return () => clearInterval(timer);
  }, [text]);
  return <span>{displayed}</span>;
};

const RaiseMode = ({ onSwitchMode, sysTime }) => {
  const [myPokemon, setMyPokemon] = useState(null);
  const [gameState, setGameState] = useState('loading'); 
  const [enemy, setEnemy] = useState(null);
  
  const [battleLog, setBattleLog] = useState("");
  const [turnState, setTurnState] = useState("idle"); 
  const [showMoves, setShowMoves] = useState(false);
  const [notice, setNotice] = useState({ show: false, title: "", message: "" });
  const [startMenuOpen, setStartMenuOpen] = useState(false);

  const [pendingEvolution, setPendingEvolution] = useState(null);
  const [pendingMove, setPendingMove] = useState(null);

  // 배틀 전용 일회성 상태 (랭크 증감)
  const [playerStages, setPlayerStages] = useState({});
  const [enemyStages, setEnemyStages] = useState({});

  useEffect(() => {
    const saved = localStorage.getItem('win95_raised_pokemon');
    if (saved) {
      setMyPokemon(JSON.parse(saved));
      setGameState('center');
    } else {
      setGameState('mbti');
    }
  }, []);

  const triggerNotice = (title, message) => setNotice({ show: true, title, message });

  const saveMyPokemon = (data) => {
    setMyPokemon(data);
    localStorage.setItem('win95_raised_pokemon', JSON.stringify(data));
  };

  const handleMbtiComplete = async (mbtiStr) => {
    setGameState('loading');
    const targetId = MBTI_POKEMON_MAP[mbtiStr] || 25;
    const newPartner = await fetchPokemonData(targetId, 5);
    saveMyPokemon(newPartner);
    triggerNotice("오박사의 메시지", `당신의 성향은 ${mbtiStr} 이군요!\n당신에게 딱 맞는 파트너는 [${newPartner.name}] 입니다!`);
    setGameState('center');
  };

  const startBattle = async () => {
    playSfx('click');
    setGameState('loading');
    const randomId = Math.floor(Math.random() * 151) + 1;
    const enemyLevel = Math.max(1, myPokemon.level + Math.floor(Math.random() * 3) - 1);
    const enemyData = await fetchPokemonData(randomId, enemyLevel);
    
    // 전투 시작 시 랭크 리셋
    setPlayerStages({ attack: 0, defense: 0, 'special-attack': 0, 'special-defense': 0, speed: 0, accuracy: 0, evasion: 0 });
    setEnemyStages({ attack: 0, defense: 0, 'special-attack': 0, 'special-defense': 0, speed: 0, accuracy: 0, evasion: 0 });
    
    setEnemy(enemyData);
    setBattleLog(`앗! 야생의\n${enemyData.name}(이)가 튀어나왔다!`);
    setTurnState('animating');
    setGameState('battle');
    
    setTimeout(() => {
      setBattleLog(`가랏! ${myPokemon.name}!`);
      setTimeout(() => setTurnState('playerSelect'), 1500);
    }, 2000);
  };

  const handleRun = () => {
    playSfx('click');
    setTurnState('animating');
    setBattleLog("무사히 도망쳤다!");
    setTimeout(() => setGameState('center'), 1500);
  };

  // 턴 연산 심화 컨트롤러
  const executeTurn = (myMove) => {
    setShowMoves(false);
    setTurnState('animating');
    
    const enemyMove = enemy.moves[Math.floor(Math.random() * enemy.moves.length)];
    
    // PP 차감
    const newMoves = myPokemon.moves.map(m => m.name === myMove.name ? { ...m, current_pp: Math.max(0, m.current_pp - 1) } : m);
    const updatedMyPokemon = { ...myPokemon, moves: newMoves };
    setMyPokemon(updatedMyPokemon);
    saveMyPokemon(updatedMyPokemon);

    // 랭크 배율기
    const getStageMult = (stage) => stage > 0 ? (2 + stage) / 2 : 2 / (2 - (stage || 0));

    // 실스피드(랭크 + 마비 적용)
    const getEffectiveSpeed = (mon, stages) => {
      let spd = mon.speed * getStageMult(stages.speed || 0);
      if (mon.status === 'paralysis') spd *= 0.25;
      return spd;
    };

    const pSpd = getEffectiveSpeed(updatedMyPokemon, playerStages);
    const eSpd = getEffectiveSpeed(enemy, enemyStages);

    let first, second, firstObj, secondObj, firstMove, secondMove, firstStages, secondStages;
    
    if (pSpd >= eSpd) {
      first = 'player'; second = 'enemy';
      firstObj = updatedMyPokemon; secondObj = enemy;
      firstMove = myMove; secondMove = enemyMove;
      firstStages = playerStages; secondStages = enemyStages;
    } else {
      first = 'enemy'; second = 'player';
      firstObj = enemy; secondObj = updatedMyPokemon;
      firstMove = enemyMove; secondMove = myMove;
      firstStages = enemyStages; secondStages = playerStages;
    }

    const processAttack = async (attackerName, moveObj, isPlayerAtk, targetHp, targetObj, atkObj, atkStages, defStages) => {
      // 1. 상태이상 행동 불가 판정 (마비, 수면, 얼음)
      if (atkObj.status === 'paralysis') {
         if (Math.random() < 0.25) {
             setBattleLog(`${attackerName}(은)는 몸이 저려\n움직일 수 없다!`);
             await wait(1500);
             return targetHp;
         }
      } else if (atkObj.status === 'sleep') {
         setBattleLog(`${attackerName}(은)는 쿨쿨 잠들어 있다.`);
         await wait(1500);
         return targetHp;
      } else if (atkObj.status === 'freeze') {
         setBattleLog(`${attackerName}(은)는 얼어붙어\n움직일 수 없다!`);
         await wait(1500);
         return targetHp;
      }

      setBattleLog(`${attackerName}의\n${moveObj.name}!`);
      await wait(1500);

      // 2. 명중률 판정
      if (moveObj.accuracy && (Math.random() * 100) > moveObj.accuracy) {
         setBattleLog(`...하지만\n${attackerName}의 공격은 빗나갔다!`);
         await wait(1500);
         return targetHp;
      }

      // 3. 변화기 (Status Move) 로직 처리
      if (moveObj.power === 0) {
         let msg = "";
         // 3.1 랭크 증감
         if (moveObj.stat_changes && moveObj.stat_changes.length > 0) {
             const isTargetSelf = moveObj.target === 'user';
             const statTargetName = isTargetSelf ? attackerName : targetObj.name;
             
             moveObj.stat_changes.forEach(change => {
                 const statKey = change.stat.name;
                 const statKr = STAT_MAP[statKey] || statKey;
                 const dirMsg = change.change > 0 ? '올라갔다!' : '떨어졌다!';
                 msg += `${msg?'\n':''}${statTargetName}의 ${statKr}(이)가 ${dirMsg}`;
                 
                 const stageUpdater = isTargetSelf 
                     ? (isPlayerAtk ? setPlayerStages : setEnemyStages)
                     : (isPlayerAtk ? setEnemyStages : setPlayerStages);
                 
                 stageUpdater(prev => ({
                     ...prev, [statKey]: Math.max(-6, Math.min(6, (prev[statKey] || 0) + change.change))
                 }));
             });
             playSfx('success');
         }
         // 3.2 상태이상 유발
         if (moveObj.meta && moveObj.meta.ailment && moveObj.meta.ailment.name !== 'none') {
             const ailment = moveObj.meta.ailment.name;
             const isTargetSelf = moveObj.target === 'user';
             const statTargetName = isTargetSelf ? attackerName : targetObj.name;
             const activeTargetObj = isTargetSelf ? atkObj : targetObj;

             if (!activeTargetObj.status) {
                 msg = `${statTargetName}(은)는 ${STATUS_MAP[ailment] || ailment}에 걸렸다!`;
                 const updater = isTargetSelf
                    ? (isPlayerAtk ? setMyPokemon : setEnemy)
                    : (isPlayerAtk ? setEnemy : setMyPokemon);
                 
                 updater(prev => {
                    const next = {...prev, status: ailment};
                    if((isTargetSelf && isPlayerAtk) || (!isTargetSelf && !isPlayerAtk)) saveMyPokemon(next);
                    return next;
                 });
                 playSfx('fail');
             } else {
                 msg = `...하지만 실패했다!`;
             }
         }
         
         if(!msg) msg = `...하지만 아무 일도 일어나지 않았다.`;
         
         setBattleLog(msg);
         await wait(1800);
         return targetHp;
      }

      // 4. 공격기 (Damage Move) 데미지 계산
      const isPhysical = PHYSICAL_TYPES.includes(moveObj.type);
      let atkStat = isPhysical ? atkObj.attack : atkObj.spAtk;
      let defStat = isPhysical ? targetObj.defense : targetObj.spDef;
      
      // 랭크 배율 적용
      atkStat *= getStageMult(isPhysical ? atkStages.attack : atkStages['special-attack']);
      defStat *= getStageMult(isPhysical ? defStages.defense : defStages['special-defense']);
      
      // 화상(BRN) 물리 데미지 50% 하락 패널티
      if (isPhysical && atkObj.status === 'burn') atkStat *= 0.5;

      const stab = atkObj.types.includes(moveObj.type) ? 1.5 : 1.0;
      const effectiveness = getEffectiveness(moveObj.type, targetObj.types);
      const isCritical = Math.floor(Math.random() * 16) === 0;
      const critMultiplier = isCritical ? 2.0 : 1.0;

      let damage = Math.floor((((2 * atkObj.level / 5 + 2) * moveObj.power * atkStat / defStat) / 50 + 2) * stab * effectiveness * critMultiplier * (Math.random() * 0.15 + 0.85));
      
      if (effectiveness === 0) damage = 0; 
      if (damage === 0 && effectiveness > 0) damage = 1; 

      if (effectiveness === 0) {
        setBattleLog(`...하지만\n효과가 없는 것 같다.`);
        await wait(1500);
        return targetHp;
      }

      playSfx('hit');
      const newHp = Math.max(0, targetHp - damage);
      
      if (isPlayerAtk) setEnemy(prev => ({...prev, hp: newHp}));
      else setMyPokemon(prev => {
        const updated = {...prev, hp: newHp};
        saveMyPokemon(updated); 
        return updated;
      });
      await wait(1000);

      if (isCritical) { setBattleLog(`급소에 맞았다!`); await wait(1500); }
      if (effectiveness > 1) { setBattleLog(`효과가 굉장했다!`); await wait(1500); } 
      else if (effectiveness < 1) { setBattleLog(`효과가 별로인 것 같다...`); await wait(1500); }

      return newHp;
    };

    // 턴 종료 시 화상/독 고정 데미지 연산
    const applyStatusDamage = async (monObj, setMonFunc, isPlayer) => {
        if (monObj.hp > 0 && (monObj.status === 'burn' || monObj.status === 'poison')) {
            const dmg = Math.max(1, Math.floor(monObj.maxHp / 8));
            setBattleLog(`${monObj.name}(은)는 ${STATUS_MAP[monObj.status]} 데미지를 입었다!`);
            await wait(1500);
            playSfx('hit');
            const newHp = Math.max(0, monObj.hp - dmg);
            setMonFunc(p => {
               const updated = {...p, hp: newHp};
               if(isPlayer) saveMyPokemon(updated);
               return updated;
            });
            return newHp;
        }
        return monObj.hp;
    };

    const runTurns = async () => {
      // First Attack
      let targetHp = first === 'player' ? enemy.hp : updatedMyPokemon.hp;
      targetHp = await processAttack(firstObj.name, firstMove, first === 'player', targetHp, secondObj, firstObj, firstStages, secondStages);
      if (targetHp === 0) { await handleFaint(first === 'player' ? 'enemy' : 'player'); return; }

      // Second Attack
      let targetHp2 = second === 'player' ? enemy.hp : updatedMyPokemon.hp;
      targetHp2 = await processAttack(secondObj.name, secondMove, second === 'player', targetHp2, firstObj, secondObj, secondStages, firstStages);
      if (targetHp2 === 0) { await handleFaint(second === 'player' ? 'enemy' : 'player'); return; }

      // End of Turn Damages (상태이상 데미지 연산)
      const playerStatusHp = await applyStatusDamage(updatedMyPokemon, setMyPokemon, true);
      if (playerStatusHp === 0) { await handleFaint('player'); return; }

      const enemyStatusHp = await applyStatusDamage(enemy, setEnemy, false);
      if (enemyStatusHp === 0) { await handleFaint('enemy'); return; }

      setTurnState('playerSelect');
    };

    runTurns();
  };

  const handleFaint = async (faintedSide) => {
    if (faintedSide === 'enemy') {
      setBattleLog(`적 ${enemy.name}(은)는\n쓰러졌다!`);
      playSfx('success');
      await wait(2000);
      
      const gainedExp = enemy.level * 5;
      setBattleLog(`${myPokemon.name}(은)는\n${gainedExp}의 경험치를 얻었다!`);
      await wait(2000);
      
      let newExp = myPokemon.exp + gainedExp;
      let newLevel = myPokemon.level;
      let didLevelUp = false;
      
      while (newExp >= newLevel * 10) {
        newExp -= (newLevel * 10);
        newLevel++;
        didLevelUp = true;
      }

      let updatedPartner = { ...myPokemon, exp: newExp, level: newLevel, maxExp: newLevel * 10 };

      if (didLevelUp) {
        setBattleLog(`${myPokemon.name}(은)는\n레벨 ${newLevel}(이)가 되었다!`);
        playSfx('success');
        await wait(2000);

        updatedPartner = {
          ...updatedPartner,
          maxHp: updatedPartner.maxHp + 3, hp: updatedPartner.maxHp + 3, // Full heal on LV up!
          status: null, // 레벨업시 상태이상 보너스 회복
          attack: updatedPartner.attack + 2, defense: updatedPartner.defense + 2,
          spAtk: updatedPartner.spAtk + 2, spDef: updatedPartner.spDef + 2, speed: updatedPartner.speed + 2
        };
        saveMyPokemon(updatedPartner);

        if (EVOLUTION_TABLE[updatedPartner.id] && newLevel >= EVOLUTION_TABLE[updatedPartner.id].level) {
           setPendingEvolution({ targetId: EVOLUTION_TABLE[updatedPartner.id].targetId, partnerData: updatedPartner });
           setGameState('evolution');
           return;
        }

        const newMove = await checkNewLearnedMove(updatedPartner.id, newLevel);
        if (newMove) {
           setPendingMove({ move: newMove, partnerData: updatedPartner });
           setGameState('learn_move');
           return;
        }
      } else {
        saveMyPokemon(updatedPartner);
      }
      
      setGameState('center');
    } else {
      setBattleLog(`${myPokemon.name}(은)는\n쓰러졌다...`);
      playSfx('fail');
      await wait(2000);
      setBattleLog("눈앞이 깜깜해졌다!\n포켓몬 센터로 이동합니다.");
      await wait(2000);
      setGameState('center');
    }
  };


  // --- 서브 컴포넌트: 진화 연출 뷰 ---
  const EvolutionView = () => {
    const [msg, setMsg] = useState("");
    const [toggle, setToggle] = useState(false);
    const [evoSprite, setEvoSprite] = useState(null);

    useEffect(() => {
       const runEvo = async () => {
          const { targetId, partnerData } = pendingEvolution;
          const newPData = await fetchPokemonData(targetId, partnerData.level);
          setEvoSprite(newPData.spriteFront);
          setMsg(`어라...? ${partnerData.name}의 상태가...!`);
          
          await wait(1500);
          
          let isNew = false;
          for(let i=0; i<16; i++) {
             setToggle(isNew);
             isNew = !isNew;
             playSfx('click');
             await wait(Math.max(50, 250 - i*15)); 
          }
          
          setToggle(true);
          playSfx('success');
          setMsg(`축하합니다! ${partnerData.name}(은)는\n${newPData.name}(으)로 진화했습니다!`);
          
          const evolvedPartner = {
              ...partnerData, id: newPData.id, name: newPData.name, types: newPData.types,
              spriteFront: newPData.spriteFront, spriteBack: newPData.spriteBack,
              maxHp: newPData.maxHp, hp: newPData.maxHp,
              attack: newPData.attack, defense: newPData.defense,
              spAtk: newPData.spAtk, spDef: newPData.spDef, speed: newPData.speed
          };
          saveMyPokemon(evolvedPartner);
          await wait(3500);
          
          const move = await checkNewLearnedMove(evolvedPartner.id, evolvedPartner.level);
          if (move) {
              setPendingMove({ move, partnerData: evolvedPartner });
              setGameState('learn_move');
          } else {
              setGameState('center');
          }
       };
       runEvo();
    }, []);

    return (
       <div className="w-full max-w-sm h-full max-h-[500px] flex flex-col bg-white border-[6px] border-gray-800 relative shadow-xl justify-center items-center">
          <div className="flex-1 flex items-center justify-center relative w-full h-full">
             <div className="absolute inset-0 opacity-10 pointer-events-none" style={{backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '8px 8px'}}></div>
             {!toggle && <img src={pendingEvolution.partnerData.spriteFront} alt="old" className="w-40 h-40 object-contain pixelated absolute" />}
             {toggle && evoSprite && <img src={evoSprite} alt="new" className="w-40 h-40 object-contain pixelated absolute drop-shadow-[0_0_15px_rgba(255,255,255,1)]" />}
          </div>
          <div className="h-28 bg-white border-t-[6px] border-gray-800 p-4 text-xs font-bold leading-loose whitespace-pre-line text-black z-10 w-full">
             {msg}
          </div>
       </div>
    );
  };


  // --- 서브 컴포넌트: 기술 습득/대체 뷰 ---
  const LearnMoveView = () => {
     const [step, setStep] = useState('prompt'); 
     const { move, partnerData } = pendingMove;

     const handleLearn = () => {
         if (partnerData.moves.length < 4) {
             const updated = {...partnerData, moves: [...partnerData.moves, move]};
             saveMyPokemon(updated);
             playSfx('success');
             triggerNotice("기술 습득", `${partnerData.name}(은)는 새로 ${move.name}(을)를 배웠다!`);
             setGameState('center');
         } else {
             playSfx('click');
             setStep('select');
         }
     };

     const handleReplace = async (indexToReplace) => {
         playSfx('success');
         const oldMoveName = partnerData.moves[indexToReplace].name;
         const newMoves = [...partnerData.moves];
         newMoves[indexToReplace] = move;
         
         const updated = {...partnerData, moves: newMoves};
         saveMyPokemon(updated);
         
         triggerNotice("기술 습득 완료", `1, 2, 3... 짠!\n\n${partnerData.name}(은)는 ${oldMoveName}(을)를 잊고\n새로 ${move.name}(을)를 배웠다!`);
         setGameState('center');
     };

     return (
       <div className="w-full max-w-sm h-full max-h-[500px] flex flex-col bg-white border-[6px] border-gray-800 relative shadow-xl">
          <div className="flex-1 flex flex-col items-center justify-center p-4">
              <img src={partnerData.spriteFront} className="w-24 h-24 mb-4 pixelated drop-shadow-md" alt="" />
              <div className="text-center font-bold text-xs leading-loose bg-[#ffffe0] border-2 border-gray-800 p-3 shadow-md">
                 {step === 'prompt' ? (
                   <>{partnerData.name}(은)는 레벨업하여<br/><span className="text-blue-700">[{move.name}]</span> (위력: {move.power})<br/>기술을 배우고 싶어한다!<br/><br/>하지만 기술을 4개 다 배웠다.<br/>다른 기술을 지우고 배울까?</>
                 ) : (
                   <>어떤 기술을 잊게 하고<br/><span className="text-blue-700">[{move.name}]</span>(을)를 배울까?</>
                 )}
              </div>
          </div>

          <div className="h-36 bg-gray-100 border-t-[6px] border-gray-800 p-2 flex flex-col justify-center">
              {step === 'prompt' ? (
                  <div className="flex justify-center gap-4">
                      <button onClick={handleLearn} className="win95-outset bg-[#c0c0c0] active:win95-inset px-6 py-3 font-bold text-xs">배우게 한다</button>
                      <button onClick={() => { playSfx('click'); setGameState('center'); }} className="win95-outset bg-[#c0c0c0] active:win95-inset px-6 py-3 font-bold text-xs text-red-700">포기한다</button>
                  </div>
              ) : (
                  <div className="grid grid-cols-2 gap-2 w-full h-full">
                      {partnerData.moves.map((m, idx) => (
                          <button key={idx} onClick={() => handleReplace(idx)} className="win95-outset bg-white hover:bg-gray-200 active:win95-inset flex flex-col justify-center items-center text-xs font-bold p-1">
                              <span>{m.name}</span>
                              <span className="text-[9px] text-gray-500 font-normal">위력:{m.power}</span>
                          </button>
                      ))}
                      <button onClick={() => setStep('prompt')} className="col-span-2 win95-outset bg-[#c0c0c0] active:win95-inset text-xs font-bold py-1">돌아가기</button>
                  </div>
              )}
          </div>
       </div>
     );
  };


  return (
    <div className="w-full h-[100dvh] flex flex-col justify-between overflow-hidden bg-[#008080] font-mono select-none">
      <header className="win95-outset p-1 flex justify-between items-center bg-[#c0c0c0] shrink-0 z-20">
        <div className="flex items-center gap-1.5 pl-1">
          <div className="w-5 h-5 bg-blue-600 rounded-full border border-black relative overflow-hidden flex items-center justify-center">
            <div className="absolute top-0 left-0 w-full h-[45%] bg-blue-600"></div>
            <div className="absolute bottom-0 left-0 w-full h-[45%] bg-white"></div>
            <div className="absolute w-full h-[10%] bg-black top-[45%]"></div>
            <div className="absolute w-2 h-2 bg-white rounded-full border border-black z-10"></div>
          </div>
          <span className="font-bold text-xs text-black tracking-tight">PokeTrainer95 - Raise Mode</span>
        </div>
      </header>

      <main className="flex-1 w-full relative overflow-hidden p-2 flex justify-center items-center">
        {gameState === 'loading' && <div className="text-white font-bold animate-pulse text-xs">PokeAPI 통신 중...</div>}
        {gameState === 'mbti' && <MbtiTest onComplete={handleMbtiComplete} />}
        {gameState === 'evolution' && <EvolutionView />}
        {gameState === 'learn_move' && <LearnMoveView />}
        
        {gameState === 'center' && myPokemon && (
          <div className="win95-outset w-full max-w-sm flex flex-col bg-[#c0c0c0] shadow-xl h-full max-h-[520px]">
             <div className="win95-titlebar p-1 flex justify-between"><span className="text-xs font-bold">Trainer_Card.exe</span></div>
             <div className="p-3 bg-[#e0e0e0] flex-1 flex flex-col gap-3">
                <div className="flex gap-4 items-center bg-white win95-inset p-3">
                  <img src={myPokemon.spriteFront} alt={myPokemon.name} className="w-20 h-20 object-contain pixelated" />
                  <div className="text-xs space-y-1 font-bold w-full">
                    <div className="flex justify-between items-end border-b border-gray-300 pb-1 mb-1">
                       <p className="text-sm">{myPokemon.name} <span className="font-normal">Lv.{myPokemon.level}</span></p>
                       {myPokemon.status && <span className="text-[9px] bg-red-600 text-white px-1.5 py-0.5 rounded shadow">{STATUS_MAP[myPokemon.status]}</span>}
                    </div>
                    <p>HP: {myPokemon.hp} / {myPokemon.maxHp}</p>
                    <div className="w-full h-3 win95-inset bg-gray-300 mt-0.5">
                      <div className="h-full bg-green-500 transition-all" style={{ width: `${Math.max(0, (myPokemon.hp/myPokemon.maxHp)*100)}%` }}></div>
                    </div>
                    <p className="text-[9px] text-gray-500 mt-1 text-right">EXP: {myPokemon.exp} / {myPokemon.maxExp}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 mt-1">
                  <button onClick={startBattle} disabled={myPokemon.hp === 0} className="win95-outset bg-[#c0c0c0] active:win95-inset font-bold p-3 text-xs disabled:opacity-50 hover:bg-white transition-colors">
                    ⚔️ 풀숲 탐색하기
                  </button>
                  <button onClick={() => { playSfx('success'); const h = {...myPokemon, hp: myPokemon.maxHp, status: null, moves: myPokemon.moves.map(m=>({...m, current_pp: m.pp}))}; saveMyPokemon(h); triggerNotice("포켓몬 센터", "체력, 상태이상, 기술(PP)이 모두 회복되었습니다!"); }} className="win95-outset bg-[#c0c0c0] active:win95-inset font-bold p-3 text-xs hover:bg-white transition-colors">
                    🏥 포켓몬 센터
                  </button>
                </div>
                <div className="mt-auto win95-inset bg-black text-green-400 p-2 text-[10px] h-[100px] overflow-y-auto flex flex-col gap-1">
                  <div className="flex justify-between text-white border-b border-gray-700 pb-1 mb-1">
                     <span>【 보유 기술 】</span><span className="text-[8px] font-normal text-gray-400">최대 4개</span>
                  </div>
                  <div className="grid grid-cols-2 gap-1 mb-1">
                     {myPokemon.moves.map((m, i) => (
                        <div key={i} className="flex justify-between pr-2">
                           <span className={m.power === 0 ? "text-yellow-300" : ""}>▶ {m.name}</span>
                           <span className={`text-[8px] font-mono ${m.current_pp === 0 ? 'text-red-400' : 'text-gray-400'}`}>{m.current_pp}/{m.pp}</span>
                        </div>
                     ))}
                  </div>
                  <div className="text-white border-b border-gray-700 pb-1 mb-1 mt-1">【 스탯 정보 】</div>
                  <div className="grid grid-cols-3 gap-1 text-[9px]">
                    <div>공격: {myPokemon.attack}</div><div>특공: {myPokemon.spAtk}</div><div>스피드: {myPokemon.speed}</div>
                    <div>방어: {myPokemon.defense}</div><div>특방: {myPokemon.spDef}</div>
                  </div>
                </div>
             </div>
          </div>
        )}

        {gameState === 'battle' && (
          <div className="w-full max-w-sm h-full max-h-[500px] flex flex-col bg-[#f8f8f8] relative border-[6px] border-gray-800 shadow-xl">
            <div className="flex-1 flex flex-col relative bg-white overflow-hidden">
              <div className="absolute inset-0 opacity-10 pointer-events-none" style={{backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '8px 8px'}}></div>
              
              <div className="h-1/2 relative">
                <div className="absolute top-3 left-3 win95-outset bg-[#ffffe0] p-1.5 px-3 border-2 border-gray-800 shadow rounded-tl-lg rounded-br-lg w-44 z-10">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-bold text-xs">{enemy?.name}</span>
                    <span className="text-[10px] font-bold">Lv{enemy?.level}</span>
                  </div>
                  <div className="w-full h-2.5 win95-inset bg-gray-200 border border-gray-600 relative overflow-hidden flex items-center px-0.5">
                    <span className="text-[8px] font-bold text-yellow-600 mr-1 pb-0.5">HP</span>
                    <div className={`h-1.5 transition-all duration-300 ${enemy?.hp/enemy?.maxHp > 0.5 ? 'bg-green-500' : enemy?.hp/enemy?.maxHp > 0.2 ? 'bg-yellow-500' : 'bg-red-500'}`} style={{ width: `${Math.max(0, (enemy?.hp / enemy?.maxHp) * 100)}%` }}></div>
                  </div>
                  {enemy?.status && <span className="absolute -bottom-3 left-2 text-[9px] bg-red-600 text-white px-1 rounded shadow">{STATUS_MAP[enemy.status]}</span>}
                </div>
                <div className="absolute top-8 right-6">
                   <img src={enemy?.spriteFront} alt="Enemy" className="w-28 h-28 object-contain pixelated drop-shadow-md" />
                   <div className="w-20 h-4 bg-black/20 rounded-[50%] mx-auto mt-[-10px] z-[-1]"></div>
                </div>
              </div>

              <div className="h-1/2 relative">
                <div className="absolute bottom-6 left-6 z-10">
                   <img src={myPokemon?.spriteBack} alt="Player" className="w-32 h-32 object-contain pixelated drop-shadow-md scale-125" />
                </div>
                <div className="absolute bottom-5 right-3 win95-outset bg-[#ffffe0] p-1.5 px-3 border-2 border-gray-800 shadow rounded-tl-lg rounded-br-lg w-48 z-10">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-bold text-xs">{myPokemon?.name}</span>
                    <span className="text-[10px] font-bold">Lv{myPokemon?.level}</span>
                  </div>
                  <div className="w-full h-2.5 win95-inset bg-gray-200 border border-gray-600 relative overflow-hidden flex items-center px-0.5">
                    <span className="text-[8px] font-bold text-yellow-600 mr-1 pb-0.5">HP</span>
                    <div className={`h-1.5 transition-all duration-300 ${myPokemon?.hp/myPokemon?.maxHp > 0.5 ? 'bg-green-500' : myPokemon?.hp/myPokemon?.maxHp > 0.2 ? 'bg-yellow-500' : 'bg-red-500'}`} style={{ width: `${Math.max(0, (myPokemon?.hp / myPokemon?.maxHp) * 100)}%` }}></div>
                  </div>
                  {/* 배틀 중 경험치 게이지 바 추가 */}
                  <div className="w-full h-1.5 win95-inset bg-gray-200 border border-gray-600 mt-0.5 overflow-hidden">
                    <div className="h-full bg-cyan-400 transition-all duration-300" style={{ width: `${Math.max(0, (myPokemon?.exp / myPokemon?.maxExp) * 100)}%` }}></div>
                  </div>
                  <div className="flex justify-between items-center mt-1">
                     <span>{myPokemon?.status && <span className="text-[9px] bg-red-600 text-white px-1 rounded shadow">{STATUS_MAP[myPokemon.status]}</span>}</span>
                     <span className="text-[10px] font-bold tracking-widest">{myPokemon?.hp} / {myPokemon?.maxHp}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="h-32 bg-white border-t-[6px] border-gray-800 flex relative">
              <div className="flex-1 p-4 text-xs leading-loose font-bold border-r-[6px] border-gray-800 flex items-center whitespace-pre-line text-black">
                {turnState === 'animating' ? (
                  <TypeWriter text={battleLog} speed={25} />
                ) : (
                  battleLog || `${myPokemon?.name}(은)는 무엇을 할까?`
                )}
              </div>
              
              {turnState === 'playerSelect' && !showMoves && (
                <div className="w-36 grid grid-cols-2 grid-rows-2 bg-white">
                  <button onClick={() => { playSfx('click'); setShowMoves(true); }} className="hover:bg-gray-200 text-xs font-bold active:bg-gray-300 text-left pl-3 text-black transition-colors">싸운다</button>
                  <button className="text-xs font-bold text-gray-300 text-left pl-3 cursor-not-allowed">가방</button>
                  <button className="text-xs font-bold text-gray-300 text-left pl-3 cursor-not-allowed">포켓몬</button>
                  <button onClick={handleRun} className="hover:bg-gray-200 text-xs font-bold active:bg-gray-300 text-left pl-3 text-black transition-colors">도망친다</button>
                </div>
              )}

              {turnState === 'playerSelect' && showMoves && (
                <div className="absolute inset-0 bg-white grid grid-cols-2 grid-rows-2 z-20 pb-6">
                  {myPokemon.moves.map((move, idx) => (
                    <button 
                      key={idx} onClick={() => { if (move.current_pp > 0) executeTurn(move); else playSfx('fail'); }}
                      className={`hover:bg-gray-200 border border-gray-300 text-[11px] font-bold active:bg-gray-300 flex flex-col justify-center items-start pl-6 relative text-black ${move.current_pp === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      <span className="absolute left-2 text-[9px] top-1/2 -translate-y-1/2">▶</span>
                      <div className="flex items-center gap-1">
                        <span>{move.name}</span>
                        <span className={`text-[8px] px-1 rounded text-white ${move.power === 0 ? 'bg-gray-500' : PHYSICAL_TYPES.includes(move.type) ? 'bg-red-700' : 'bg-indigo-700'}`}>
                           {move.power === 0 ? '변화' : PHYSICAL_TYPES.includes(move.type) ? '물리' : '특수'}
                        </span>
                      </div>
                      <span className={`font-mono text-[9px] mt-0.5 ${move.current_pp === 0 ? 'text-red-600' : 'text-gray-500'}`}>
                        PP {move.current_pp}/{move.pp}
                      </span>
                    </button>
                  ))}
                  <button 
                     onClick={() => { playSfx('click'); setShowMoves(false); }}
                     className="absolute bottom-1 left-1/2 -translate-x-1/2 bg-gray-200 px-6 py-0.5 text-[10px] win95-outset active:win95-inset font-bold text-black"
                  >취소</button>
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      {notice.show && (
        <div className="absolute inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="win95-outset w-full max-w-xs flex flex-col bg-[#c0c0c0]">
            <div className="win95-titlebar p-1 flex justify-between items-center"><span className="text-xs font-bold pl-1">{notice.title}</span></div>
            <div className="p-4 bg-[#e0e0e0] text-xs font-bold whitespace-pre-line leading-relaxed text-black text-center">{notice.message}</div>
            <div className="p-2 bg-[#c0c0c0] border-t border-gray-400 flex justify-end">
              <button onClick={() => { playSfx('click'); setNotice({...notice, show:false}); }} className="win95-outset bg-[#c0c0c0] active:win95-inset px-4 py-1 text-xs font-bold">확인</button>
            </div>
          </div>
        </div>
      )}

      <footer className="h-11 bg-[#c0c0c0] border-t-2 border-t-white flex items-center justify-between px-1 select-none shrink-0 z-20">
        <div className="flex items-center gap-1.5 relative">
          <button onClick={() => { playSfx('click'); setStartMenuOpen(!startMenuOpen); }} className={`px-2 h-8 flex items-center gap-1 font-bold text-xs text-black border-2 transition-all ${startMenuOpen ? 'win95-inset bg-[#d4d4d4] translate-y-[1px]' : 'win95-outset bg-[#c0c0c0]'}`}>
            <div className="flex flex-wrap w-4 h-3.5 gap-[1px]">
              <div className="w-[7px] h-[6px] bg-red-500"></div><div className="w-[7px] h-[6px] bg-green-500"></div>
              <div className="w-[7px] h-[6px] bg-blue-500"></div><div className="w-[7px] h-[6px] bg-yellow-500"></div>
            </div>
            <span>시작</span>
          </button>
          <div className="win95-inset bg-[#e0e0e0] h-8 px-2.5 flex items-center text-[10px] text-gray-800 font-bold border-l-2">
            📟 Raise_Pokemon_Mode
          </div>

          {startMenuOpen && (
            <div className="absolute bottom-10 left-0 w-48 bg-[#c0c0c0] win95-outset z-30 p-1 space-y-1">
              <div className="bg-[#000080] text-white py-1 px-2 text-[10px] font-bold tracking-widest uppercase">POKEMON 95 EDITION</div>
              <button onClick={() => { playSfx('click'); setStartMenuOpen(false); onSwitchMode('collect'); }} className="w-full text-left text-xs font-bold text-blue-800 hover:bg-[#000080] hover:text-white px-2 py-1.5 transition-colors">
                🎮 수집 모드로 돌아가기
              </button>
            </div>
          )}
        </div>
        <div className="win95-inset px-2.5 h-8 flex items-center gap-2 text-xs text-black bg-[#e0e0e0]">
          <span className="cursor-pointer" onClick={() => { playSfx('success'); }} title="테스트 음 생성">🔊</span>
          <span className="font-bold border-l pl-2 font-mono text-[11px] whitespace-nowrap">{sysTime}</span>
        </div>
      </footer>
    </div>
  );
};


// ==========================================
// 4. 수집 모드 (Collect Mode) 원형 보존
// ==========================================
const CollectMode = ({ onSwitchMode, sysTime }) => {
  const [currentPokemon, setCurrentPokemon] = useState(null);
  const [choices, setChoices] = useState([]);
  const [silhouetteMode, setSilhouetteMode] = useState(true);
  const [loading, setLoading] = useState(true);
  const [caughtList, setCaughtList] = useState([]);
  const [currentTab, setCurrentTab] = useState('quiz');
  const [captureState, setCaptureState] = useState('idle'); 
  const [selectedPokedexItem, setSelectedPokedexItem] = useState(null);
  const [speciesLoading, setSpeciesLoading] = useState(false);
  const [speciesInfo, setSpeciesInfo] = useState({ description: "", category: "" });
  const [win95Notice, setWin95Notice] = useState({ show: false, title: "", message: "", type: "info" });
  const [startMenuOpen, setStartMenuOpen] = useState(false);

  const [touchStart, setTouchStart] = useState({ x: 0, y: 0 });
  const [touchDelta, setTouchDelta] = useState({ x: 0, y: 0 });
  const [isPullingDown, setIsPullingDown] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('win95_caught_pokemon');
    if (saved) {
      try { setCaughtList(JSON.parse(saved)); } catch (e) { setCaughtList([]); }
    }
  }, []);

  const saveCaughtList = (list) => {
    setCaughtList(list);
    localStorage.setItem('win95_caught_pokemon', JSON.stringify(list));
  };

  const fetchRandomPokemon = async () => {
    setLoading(true);
    setCaptureState('idle');
    setSilhouetteMode(true);
    
    try {
      const validIds = Object.keys(POKEMON_NAMES_KO).map(Number);
      const randomId = validIds[Math.floor(Math.random() * validIds.length)];
      
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`);
      if (!res.ok) throw new Error("포켓몬 기본 데이터를 호출하지 못했습니다.");
      const data = await res.json();
      
      const correctName = POKEMON_NAMES_KO[randomId];
      if (!correctName) throw new Error("정치 이름 데이터가 손상되었습니다.");
      
      const wrongChoices = [];
      while (wrongChoices.length < 3) {
        const randId = validIds[Math.floor(Math.random() * validIds.length)];
        const candidate = POKEMON_NAMES_KO[randId];
        if (candidate !== correctName && !wrongChoices.includes(candidate)) {
          wrongChoices.push(candidate);
        }
      }
      
      const allChoices = [correctName, ...wrongChoices].sort(() => Math.random() - 0.5);
      
      setCurrentPokemon({
        id: randomId, name: correctName, englishName: data.name,
        sprite: data.sprites?.other?.['official-artwork']?.front_default || data.sprites?.front_default,
        types: data.types.map(t => t.type.name),
        height: data.height / 10, weight: data.weight / 10
      });
      setChoices(allChoices);
    } catch (err) {
      triggerNotice("네트워크 장치 경고", "PokéAPI 로딩 지연이 감지되었습니다. 아래로 다시 드래그해 보세요.", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchRandomPokemon(); }, []);

  useEffect(() => {
    if (!selectedPokedexItem) {
      setSpeciesInfo({ description: "", category: "" });
      return;
    }
    const fetchSpeciesData = async () => {
      setSpeciesLoading(true);
      try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${selectedPokedexItem.id}`);
        if (!res.ok) throw new Error("도감 설명 호출 실패");
        const data = await res.json();
        const koreanFlavorEntry = data.flavor_text_entries.find(entry => entry.language.name === "ko");
        const cleanDescription = koreanFlavorEntry ? koreanFlavorEntry.flavor_text.replace(/\n|\f/g, " ") : "아직 알려진 도감 정보가 기술되지 않은 희귀 포켓몬입니다.";
        const koreanGenusEntry = data.genera.find(g => g.language.name === "ko");
        const cleanCategory = koreanGenusEntry ? koreanGenusEntry.genus : "미분류 포켓몬";
        setSpeciesInfo({ description: cleanDescription, category: cleanCategory });
      } catch (err) {
        setSpeciesInfo({ description: "데이터 전송 손상으로 정보를 불러오지 못했습니다. 다시 시도해 주세요.", category: "미확인포켓몬" });
      } finally {
        setSpeciesLoading(false);
      }
    };
    fetchSpeciesData();
  }, [selectedPokedexItem]);

  const triggerNotice = (title, message, type = "info") => { setWin95Notice({ show: true, title, message, type }); };

  const handleAnswerSubmit = (selectedAnswer) => {
    if (captureState !== 'idle') return;
    if (selectedAnswer === currentPokemon.name) {
      playSfx('success');
      setCaptureState('throwing');
      setSilhouetteMode(false);
      setTimeout(() => {
        setCaptureState('shaking');
        playSfx('shake');
        setTimeout(() => { playSfx('shake'); }, 600);
        setTimeout(() => { playSfx('shake'); }, 1200);
        setTimeout(() => {
          setCaptureState('success');
          if (!caughtList.some(item => item.id === currentPokemon.id)) {
            const newList = [...caughtList, { ...currentPokemon, caughtAt: new Date().toLocaleDateString() }].sort((a, b) => a.id - b.id);
            saveCaughtList(newList);
          }
          setTimeout(() => { fetchRandomPokemon(); }, 1800);
        }, 1800);
      }, 1000);
    } else {
      playSfx('fail');
      triggerNotice("포획 실패", `틀렸습니다! 이 실루엣 포켓몬의 본명은 "${selectedAnswer}"이(가) 아닙니다.`, "error");
    }
  };

  const handleTouchStart = (e) => {
    const touch = e.touches[0];
    setTouchStart({ x: touch.clientX, y: touch.clientY });
    setTouchDelta({ x: 0, y: 0 });
    setIsPullingDown(false);
  };

  const handleTouchMove = (e) => {
    if (!touchStart.x) return;
    const touch = e.touches[0];
    const diffX = touch.clientX - touchStart.x;
    const diffY = touch.clientY - touchStart.y;
    setTouchDelta({ x: diffX, y: diffY });
    if (currentTab === 'quiz' && diffY > 30 && Math.abs(diffX) < 45) { setIsPullingDown(true); }
  };

  const handleTouchEnd = () => {
    const xThreshold = 90;
    const yThreshold = 110;
    if (currentTab === 'quiz' && isPullingDown && touchDelta.y > yThreshold) { playSfx('click'); fetchRandomPokemon(); }
    if (touchDelta.x < -xThreshold && currentTab === 'quiz') { playSfx('click'); setCurrentTab('pokedex'); }
    if (touchDelta.x > xThreshold && currentTab === 'pokedex') { playSfx('click'); setCurrentTab('quiz'); }
    setTouchStart({ x: 0, y: 0 });
    setTouchDelta({ x: 0, y: 0 });
    setIsPullingDown(false);
  };

  return (
    <div className="w-full h-[100dvh] flex flex-col justify-between overflow-hidden bg-[#008080] font-mono select-none" onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd}>
      <header className="win95-outset p-1 flex justify-between items-center bg-[#c0c0c0] shrink-0 z-20">
        <div className="flex items-center gap-1.5 pl-1">
          <div className="w-5 h-5 bg-red-600 rounded-full border border-black relative overflow-hidden flex items-center justify-center">
            <div className="absolute top-0 left-0 w-full h-[45%] bg-red-600"></div>
            <div className="absolute bottom-0 left-0 w-full h-[45%] bg-white"></div>
            <div className="absolute w-full h-[10%] bg-black top-[45%]"></div>
            <div className="absolute w-2 h-2 bg-white rounded-full border border-black z-10"></div>
          </div>
          <span className="font-bold text-xs text-black tracking-tight">PokeCollector95</span>
        </div>
        <div className="flex gap-1">
          <button onClick={() => { playSfx('click'); setCurrentTab('quiz'); }} className={`px-3 py-1 text-xs font-bold transition-all ${currentTab === 'quiz' ? 'win95-inset bg-[#e0e0e0] translate-y-[1px]' : 'win95-outset bg-[#c0c0c0]'}`}>🕹️ 포획퀴즈</button>
          <button onClick={() => { playSfx('click'); setCurrentTab('pokedex'); }} className={`px-3 py-1 text-xs font-bold transition-all ${currentTab === 'pokedex' ? 'win95-inset bg-[#e0e0e0] translate-y-[1px]' : 'win95-outset bg-[#c0c0c0]'}`}>📖 내 도감 ({caughtList.length})</button>
        </div>
      </header>

      {isPullingDown && currentTab === 'quiz' && (
        <div className="absolute left-0 right-0 bg-[#c0c0c0] border-b-2 border-b-[#808080] flex flex-col items-center justify-center py-2 transition-all duration-75 z-10 text-xs text-black" style={{ top: '38px', height: `${Math.min(touchDelta.y, 140)}px`, opacity: Math.min(touchDelta.y / 100, 1) }}>
          <div className="animate-bounce mb-1">⬇️</div>
          <p className="font-bold">{touchDelta.y > 110 ? "손을 놓으면 다른 포켓몬이 호출됩니다!" : "아래로 힘껏 당기세요"}</p>
          <div className="w-1/2 bg-gray-300 h-1.5 mt-1 win95-inset"><div className="bg-blue-800 h-full transition-all" style={{ width: `${Math.min((touchDelta.y / 110) * 100, 100)}%` }}></div></div>
        </div>
      )}

      <main className="flex-1 w-full relative overflow-hidden p-2 flex justify-center items-center">
        <div className={`absolute inset-0 p-2 flex flex-col justify-center items-center transition-transform duration-300 ${currentTab === 'quiz' ? 'translate-x-0' : '-translate-x-full pointer-events-none'}`}>
          <div className="win95-outset w-full max-w-sm flex flex-col bg-[#c0c0c0] shadow-xl max-h-full">
            <div className="win95-titlebar p-1 select-none flex items-center justify-between">
              <span className="text-xs font-bold tracking-wider truncate">Wild_Pokemon_Encounter.dll</span>
              <div className="flex gap-1">
                <button className="win95-outset text-black font-extrabold text-[10px] w-4 h-4 flex items-center justify-center p-0 cursor-default bg-[#c0c0c0]">_</button>
                <button className="win95-outset text-black font-extrabold text-[10px] w-4 h-4 flex items-center justify-center p-0 cursor-default bg-[#c0c0c0]">?</button>
              </div>
            </div>
            <div className="bg-[#e0e0e0] border-b border-[#808080] px-2 py-1 flex justify-between items-center text-[10px] text-gray-700">
              <span>수집 진행: {caughtList.length}/151 마리</span>
              <span>상태: 야생 출현 확인</span>
            </div>
            <div className="p-3 flex-1 overflow-y-auto flex flex-col justify-between gap-2.5 min-h-0 bg-[#e0e0e0]">
              {loading ? (
                <div className="flex-1 flex flex-col items-center justify-center py-12">
                  <div className="text-4xl animate-spin mb-4">⏳</div>
                  <p className="text-xs font-bold text-gray-800 animate-pulse">PokéAPI 데이터베이스 정렬 중...</p>
                </div>
              ) : (
                <>
                  <div className="win95-inset relative bg-gradient-to-b from-slate-950 via-slate-900 to-zinc-950 flex-1 min-h-[160px] max-h-[25vh] flex items-center justify-center overflow-hidden rounded">
                    <div className="absolute inset-0 opacity-15 pointer-events-none" style={{backgroundImage: 'radial-gradient(#ffffff 2px, transparent 2px)', backgroundSize: '16px 16px'}}></div>
                    <div className="absolute w-36 h-36 rounded-full bg-white/10 blur-2xl pointer-events-none"></div>
                    <div className="absolute w-20 h-20 rounded-full bg-blue-500/10 blur-xl pointer-events-none"></div>
                    <div className="absolute inset-1.5 border border-white/5 rounded pointer-events-none"></div>
                    <span className="absolute top-2 left-2 text-[9px] text-green-400 font-mono tracking-widest bg-black/80 px-1.5 py-0.5 rounded border border-green-800">
                      INDEX: {String(currentPokemon?.id).padStart(3, '0')}
                    </span>
                    {captureState === 'idle' || captureState === 'throwing' ? (
                      <img src={currentPokemon?.sprite} alt="Wild Silhouette" className={`w-32 h-32 md:w-36 md:h-36 object-contain transition-all duration-300 ${silhouetteMode ? 'brightness-0 contrast-200 drop-shadow-[0_0_15px_rgba(255,255,255,0.7)] scale-95' : 'scale-100 drop-shadow-[0_4px_10px_rgba(0,0,0,0.5)]'}`} />
                    ) : null}
                    {captureState !== 'idle' && (
                      <div className="absolute inset-0 flex items-center justify-center z-10 bg-[#1e293b]/85">
                        <div className="flex flex-col items-center">
                          <div className={`w-14 h-14 relative transition-all duration-300 ${captureState === 'throwing' ? 'animate-bounce scale-110' : ''} ${captureState === 'shaking' ? 'animate-pulse' : ''}`}>
                            <svg viewBox="0 0 100 100" className={`w-full h-full drop-shadow-lg ${captureState === 'shaking' ? 'animate-[spin_1.5s_linear_infinite]' : ''}`}>
                              <circle cx="50" cy="50" r="45" fill="white" stroke="black" strokeWidth="6" />
                              <path d="M 5,50 A 45,45 0 0,1 95,50 Z" fill="#EF4444" stroke="black" strokeWidth="6" />
                              <line x1="5" y1="50" x2="95" y2="50" stroke="black" strokeWidth="6" />
                              <circle cx="50" cy="50" r="14" fill="white" stroke="black" strokeWidth="6" />
                              <circle cx="50" cy="50" r="6" fill={captureState === 'shaking' ? '#FBBF24' : 'white'} />
                            </svg>
                          </div>
                          <div className="mt-3 bg-[#e0e0e0] border-2 border-gray-800 px-2 py-0.5 text-[9px] text-black font-bold font-mono rounded">
                            {captureState === 'throwing' && "몬스터볼 포착 전송!"}
                            {captureState === 'shaking' && "흔들림 신호 제어 중..."}
                            {captureState === 'success' && "🎉 포획 완료! 도감 동기화 성공"}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="text-center py-0.5">
                    <p className="text-[12px] font-bold text-black leading-tight">❓ 이 실루엣 속 1세대 포켓몬의 진짜 이름은?</p>
                  </div>
                  <div className="grid grid-cols-2 gap-1.5">
                    {choices.map((choice, idx) => (
                      <button key={idx} onClick={() => handleAnswerSubmit(choice)} disabled={captureState !== 'idle'} className="win95-outset active:win95-inset bg-[#c0c0c0] hover:bg-[#d0d0d0] disabled:opacity-60 text-xs font-extrabold py-2 px-1 text-center text-black border-2 border-t-white border-l-white border-b-gray-800 border-r-gray-800 rounded transition-all truncate">
                        {choice}
                      </button>
                    ))}
                  </div>
                  <div className="text-center text-[9px] text-gray-500 mt-0.5 select-none leading-tight">
                    👋 다른 포켓몬을 관측하려면 화면을 아래로 당겼다가(Pull down) 놓아주세요.
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        <div className={`absolute inset-0 p-2 flex flex-col justify-center items-center transition-transform duration-300 ${currentTab === 'pokedex' ? 'translate-x-0' : 'translate-x-full pointer-events-none'}`}>
          <div className="win95-outset w-full max-w-sm flex flex-col bg-[#c0c0c0] shadow-xl max-h-full">
            <div className="win95-titlebar p-1 select-none flex items-center justify-between">
              <span className="text-xs font-bold tracking-wider">My_Pokedex_Library.dll</span>
              <div className="flex gap-1">
                <button className="win95-outset text-black font-extrabold text-[10px] w-4 h-4 flex items-center justify-center p-0 cursor-default bg-[#c0c0c0]">_</button>
                <button className="win95-outset text-black font-extrabold text-[10px] w-4 h-4 flex items-center justify-center p-0 cursor-default bg-[#c0c0c0]">X</button>
              </div>
            </div>
            <div className="bg-[#e0e0e0] border-b border-[#808080] px-3 py-1 flex justify-between items-center text-[10px] text-gray-700">
              <span>확보된 개체: {caughtList.length}/151</span>
              <span>수집 성공률: {Math.round((caughtList.length / 151) * 100)}%</span>
            </div>
            <div className="p-3 bg-[#e0e0e0] flex-1 overflow-y-auto min-h-0">
              {caughtList.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center py-16 text-center">
                  <div className="text-3xl mb-3 opacity-60">📁</div>
                  <p className="text-xs font-bold text-gray-700">포획 도감 데이터가 비어 있습니다.</p>
                  <p className="text-[11px] text-gray-500 mt-1 max-w-[210px]">퀴즈를 정확히 풀어 야생 포켓몬을 최초 1회 이상 안전하게 포획해 주세요.</p>
                </div>
              ) : (
                <div className="grid grid-cols-3 gap-1.5">
                  {caughtList.map((pokemon) => (
                    <div key={pokemon.id} onClick={() => { playSfx('click'); setSelectedPokedexItem(pokemon); }} className="win95-outset active:win95-inset bg-[#d8d8d8] p-1.5 flex flex-col items-center justify-center cursor-pointer hover:bg-white transition-colors rounded">
                      <div className="w-10 h-10 bg-black/5 rounded flex items-center justify-center overflow-hidden mb-1">
                        <img src={pokemon.sprite} alt={pokemon.name} className="w-9 h-9 object-contain" />
                      </div>
                      <span className="text-[8px] font-mono text-gray-500 block">No.{String(pokemon.id).padStart(3, '0')}</span>
                      <span className="text-[11px] font-bold text-black truncate w-full text-center">{pokemon.name}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="p-2 border-t border-[#808080] bg-[#c0c0c0] flex justify-end">
              <button onClick={() => { if (confirm("정말 모든 수집 기록을 파기하고 도감을 공장 초기화 상태로 되돌리시겠습니까?")) { playSfx('fail'); saveCaughtList([]); } }} className="win95-outset active:win95-inset text-[9px] px-2 py-1 text-red-700 font-bold hover:bg-red-50">도감 하드 리셋</button>
            </div>
          </div>
        </div>
      </main>

      {selectedPokedexItem && (
        <div className="absolute inset-0 bg-black/60 z-40 flex items-center justify-center p-4">
          <div className="win95-outset w-full max-w-sm flex flex-col bg-[#c0c0c0]">
            <div className="win95-titlebar p-1 select-none flex items-center justify-between">
              <span className="text-xs font-bold">도감_스토리_프로파일.exe</span>
              <button onClick={() => { playSfx('click'); setSelectedPokedexItem(null); }} className="win95-outset text-black font-extrabold text-xs w-5 h-5 flex items-center justify-center p-0 bg-[#c0c0c0] active:win95-inset">✕</button>
            </div>
            <div className="p-4 bg-[#e0e0e0] flex flex-col gap-3.5 text-xs text-black overflow-y-auto max-h-[65vh]">
              <div className="flex gap-3">
                <div className="win95-inset bg-[#ffffff] w-20 h-20 flex items-center justify-center shrink-0 rounded">
                  <img src={selectedPokedexItem.sprite} alt={selectedPokedexItem.name} className="w-16 h-16 object-contain" />
                </div>
                <div className="flex-1 flex flex-col justify-center gap-0.5">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] bg-red-600 text-white font-mono px-1 py-0.2 rounded font-bold">No.{String(selectedPokedexItem.id).padStart(3, '0')}</span>
                    <h3 className="text-sm font-bold text-black font-mono">{selectedPokedexItem.name}</h3>
                  </div>
                  <p className="text-[10px] text-gray-500 italic uppercase">{selectedPokedexItem.englishName}</p>
                  <div className="mt-1 text-[11px] text-gray-700 space-y-0.5 font-sans">
                    <p>⚡ 분류: <strong className="text-blue-900">{speciesLoading ? "스캔 중..." : speciesInfo.category}</strong></p>
                    <p>⚖️ 제원: {selectedPokedexItem.height}m / {selectedPokedexItem.weight}kg</p>
                  </div>
                </div>
              </div>
              <div className="win95-inset p-3 bg-neutral-950 text-emerald-400 rounded flex flex-col gap-1.5 font-mono">
                <div className="flex justify-between items-center border-b border-emerald-900 pb-1 text-[10px]">
                  <span>📠 DATABASE_FLAVOR_ENTRY_READ</span><span className="animate-pulse">● READY</span>
                </div>
                {speciesLoading ? (
                  <div className="py-6 text-center text-xs tracking-wider animate-pulse text-emerald-500">원격 메인컴퓨터에서 도감 스토리 로그 로딩 중...</div>
                ) : (
                  <div className="py-1 text-[11.5px] leading-relaxed select-text font-medium break-all whitespace-pre-line text-emerald-300">"{speciesInfo.description}"</div>
                )}
              </div>
              <div className="flex justify-between items-center text-[9px] text-gray-500 font-mono mt-0.5">
                <span>SYSTEM: RECORDED_SUCCESSFULLY</span><span>분석일시: {selectedPokedexItem.caughtAt || "불명"}</span>
              </div>
            </div>
            <div className="p-2 border-t border-[#808080] bg-[#c0c0c0] flex justify-end">
              <button onClick={() => { playSfx('click'); setSelectedPokedexItem(null); }} className="win95-outset active:win95-inset px-4 py-1.5 text-xs text-black font-extrabold">도감 닫기 (C)</button>
            </div>
          </div>
        </div>
      )}

      {win95Notice.show && (
        <div className="absolute inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="win95-outset w-full max-w-xs flex flex-col bg-[#c0c0c0]">
            <div className="win95-titlebar p-1 flex justify-between items-center select-none">
              <span className="text-xs font-bold">{win95Notice.title}</span>
              <button onClick={() => setWin95Notice({ ...win95Notice, show: false })} className="win95-outset text-black text-xs w-4 h-4 flex items-center justify-center bg-[#c0c0c0]">✕</button>
            </div>
            <div className="p-4 bg-[#e0e0e0] flex items-start gap-3">
              <div className="text-2xl shrink-0">{win95Notice.type === 'error' ? '❌' : 'ℹ️'}</div>
              <p className="text-xs text-black leading-normal mt-0.5">{win95Notice.message}</p>
            </div>
            <div className="p-2 bg-[#c0c0c0] border-t border-[#808080] flex justify-end">
              <button onClick={() => { playSfx('click'); setWin95Notice({ ...win95Notice, show: false }); }} className="win95-outset active:win95-inset px-4 py-1 text-xs text-black font-bold">확인</button>
            </div>
          </div>
        </div>
      )}

      <footer className="h-11 bg-[#c0c0c0] border-t-2 border-t-white flex items-center justify-between px-1 select-none shrink-0 z-20">
        <div className="flex items-center gap-1.5 relative">
          <button onClick={() => { playSfx('click'); setStartMenuOpen(!startMenuOpen); }} className={`px-2 h-8 flex items-center gap-1 font-bold text-xs text-black border-2 transition-all ${startMenuOpen ? 'win95-inset bg-[#d4d4d4] translate-y-[1px]' : 'win95-outset bg-[#c0c0c0]'}`}>
            <div className="flex flex-wrap w-4 h-3.5 gap-[1px]">
              <div className="w-[7px] h-[6px] bg-red-500"></div><div className="w-[7px] h-[6px] bg-green-500"></div>
              <div className="w-[7px] h-[6px] bg-blue-500"></div><div className="w-[7px] h-[6px] bg-yellow-500"></div>
            </div>
            <span>시작</span>
          </button>
          <div className="win95-inset bg-[#e0e0e0] h-8 px-2.5 flex items-center text-[10px] text-gray-800 font-bold border-l-2">
            📟 {currentTab === 'quiz' ? 'Wild_Pokemon' : 'Pokedex_Library'}
          </div>

          {startMenuOpen && (
            <div className="absolute bottom-10 left-0 w-48 bg-[#c0c0c0] win95-outset z-30 p-1 space-y-1">
              <div className="bg-[#000080] text-white py-1 px-2 text-[10px] font-bold tracking-widest uppercase">POKEMON 95 EDITION</div>
              <button onClick={() => { playSfx('click'); setStartMenuOpen(false); onSwitchMode('raise'); }} className="w-full text-left text-xs font-bold text-blue-800 hover:bg-[#000080] hover:text-white px-2 py-2 transition-colors">⚔️ 1세대 육성 모드 (배틀) 전환</button>
              <div className="border-t border-[#808080] my-1"></div>
              <button onClick={() => { playSfx('click'); setStartMenuOpen(false); triggerNotice("도움말", "야생 포켓몬 실루엣의 이름을 맞춰 포획하세요! 맞춘 포켓몬은 오른쪽 스와이프 도감 탭에서 확인 및 정밀한 공식 한국어 스토리 설명을 열람할 수 있습니다."); }} className="w-full text-left text-xs text-black hover:bg-[#000080] hover:text-white px-2 py-1.5 transition-colors">❔ 게임 도움말</button>
              <button onClick={() => { playSfx('click'); setStartMenuOpen(false); triggerNotice("시스템 버전 정보", "Windows 95 Pokemon Retro Emulator (Ver 4.95.2026) - PokéAPI Live Synchronized Edition"); }} className="w-full text-left text-xs text-black hover:bg-[#000080] hover:text-white px-2 py-1.5 transition-colors">ℹ️ 에뮬레이터 정보</button>
              <div className="border-t border-[#808080] my-1"></div>
              <button onClick={() => { playSfx('click'); setStartMenuOpen(false); fetchRandomPokemon(); }} className="w-full text-left text-xs text-black hover:bg-[#000080] hover:text-white px-2 py-1.5 transition-colors">🔄 포켓몬 호출 리로드</button>
            </div>
          )}
        </div>
        <div className="win95-inset px-2.5 h-8 flex items-center gap-2 text-xs text-black bg-[#e0e0e0]">
          <span className="cursor-pointer" onClick={() => { playSfx('success'); }} title="테스트 음 생성">🔊</span>
          <span className="font-bold border-l pl-2 font-mono text-[11px] whitespace-nowrap">{sysTime}</span>
        </div>
      </footer>
    </div>
  );
};


// ==========================================
// 5. 최상위 App 셸 컴포넌트
// ==========================================
export default function App() {
  const [appMode, setAppMode] = useState('collect');
  const [sysTime, setSysTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const d = new Date();
      let hrs = d.getHours();
      const ampm = hrs >= 12 ? 'PM' : 'AM';
      hrs = hrs % 12 || 12;
      const mins = d.getMinutes().toString().padStart(2, '0');
      setSysTime(`${ampm} ${hrs}:${mins}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 15000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {appMode === 'collect' && <CollectMode onSwitchMode={setAppMode} sysTime={sysTime} />}
      {appMode === 'raise' && <RaiseMode onSwitchMode={setAppMode} sysTime={sysTime} />}
      
      {/* 스타일 강제 전처리 (전역 공유) */}
      <style>{`
        .win95-outset { border-style: solid; border-width: 2px; border-top-color: #ffffff; border-left-color: #ffffff; border-right-color: #808080; border-bottom-color: #808080; box-shadow: 1px 1px 0px 0px #000000; }
        .win95-inset { border-style: solid; border-width: 2px; border-top-color: #808080; border-left-color: #808080; border-right-color: #ffffff; border-bottom-color: #ffffff; }
        .active\\:win95-inset:active { border-style: solid; border-width: 2px; border-top-color: #808080; border-left-color: #808080; border-right-color: #ffffff; border-bottom-color: #ffffff; transform: translate(1px, 1px); box-shadow: none !important; }
        .win95-titlebar { background: linear-gradient(90deg, #000080 0%, #1084d0 100%); color: #ffffff; }
        .pixelated { image-rendering: pixelated; }
      `}</style>
    </>
  );
}