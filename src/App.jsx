import React, { useState, useEffect } from 'react';

// 포켓몬 1세대 리스트 (1~151번 누락 없이 정확한 한국어 매핑 테이블 제공)
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

// 8비트 레트로 사운드 효과 (Web Audio API)
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
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.1);
        break;
      }
      case 'success': {
        const now = ctx.currentTime;
        const notes = [293.66, 349.23, 440.00, 587.33]; // D4, F4, A4, D5
        notes.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, now + idx * 0.08);
          gain.gain.setValueAtTime(0.08, now + idx * 0.08);
          gain.gain.exponentialRampToValueAtTime(0.01, now + idx * 0.08 + 0.15);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now + idx * 0.08);
          osc.stop(now + idx * 0.08 + 0.18);
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
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(now + 0.4);
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
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.12);
        break;
      }
      default:
        break;
    }
  } catch (e) {
    console.warn("Web Audio API error", e);
  }
};

export default function App() {
  // 상태 관리
  const [currentPokemon, setCurrentPokemon] = useState(null);
  const [choices, setChoices] = useState([]);
  const [silhouetteMode, setSilhouetteMode] = useState(true);
  const [loading, setLoading] = useState(true);
  const [caughtList, setCaughtList] = useState([]);
  
  // 뷰 전환: 'quiz' / 'pokedex'
  const [currentTab, setCurrentTab] = useState('quiz');
  
  // 애니메이션 & 모달 상태
  const [captureState, setCaptureState] = useState('idle'); // 'idle' | 'throwing' | 'shaking' | 'success' | 'fail'
  const [selectedPokedexItem, setSelectedPokedexItem] = useState(null);
  
  // 도감 상세정보 스토리 비동기 조회 상태
  const [speciesLoading, setSpeciesLoading] = useState(false);
  const [speciesInfo, setSpeciesInfo] = useState({ description: "", category: "" });

  const [win95Notice, setWin95Notice] = useState({ show: false, title: "", message: "", type: "info" });
  const [startMenuOpen, setStartMenuOpen] = useState(false);
  const [sysTime, setSysTime] = useState("");

  // 모바일 제스처 변수
  const [touchStart, setTouchStart] = useState({ x: 0, y: 0 });
  const [touchDelta, setTouchDelta] = useState({ x: 0, y: 0 });
  const [isPullingDown, setIsPullingDown] = useState(false);

  // 시계 동기화
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

  // 도감 데이터 로드
  useEffect(() => {
    const saved = localStorage.getItem('win95_caught_pokemon');
    if (saved) {
      try {
        setCaughtList(JSON.parse(saved));
      } catch (e) {
        setCaughtList([]);
      }
    }
  }, []);

  const saveCaughtList = (list) => {
    setCaughtList(list);
    localStorage.setItem('win95_caught_pokemon', JSON.stringify(list));
  };

  // 포켓몬 퀴즈 무작위 로드 (1~151번 완전 매칭)
  const fetchRandomPokemon = async () => {
    setLoading(true);
    setCaptureState('idle');
    setSilhouetteMode(true);
    
    try {
      // 1세대 (1~151번 범위)에서 균일하게 랜덤 ID 생성
      const validIds = Object.keys(POKEMON_NAMES_KO).map(Number);
      const randomId = validIds[Math.floor(Math.random() * validIds.length)];
      
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`);
      if (!res.ok) throw new Error("포켓몬 기본 데이터를 호출하지 못했습니다.");
      const data = await res.json();
      
      // 정답 한국어 이름 추출
      const correctName = POKEMON_NAMES_KO[randomId];
      if (!correctName) {
        throw new Error("정치 이름 데이터가 손상되었습니다.");
      }
      
      // 오답 목록 (도감 데이터에서 무작위 선택하여 중복 배제)
      const wrongChoices = [];
      while (wrongChoices.length < 3) {
        const randId = validIds[Math.floor(Math.random() * validIds.length)];
        const candidate = POKEMON_NAMES_KO[randId];
        if (candidate !== correctName && !wrongChoices.includes(candidate)) {
          wrongChoices.push(candidate);
        }
      }
      
      // 보기 셔플
      const allChoices = [correctName, ...wrongChoices].sort(() => Math.random() - 0.5);
      
      setCurrentPokemon({
        id: randomId,
        name: correctName,
        englishName: data.name,
        sprite: data.sprites?.other?.['official-artwork']?.front_default || data.sprites?.front_default,
        types: data.types.map(t => t.type.name),
        height: data.height / 10,
        weight: data.weight / 10
      });
      setChoices(allChoices);
    } catch (err) {
      console.error(err);
      triggerNotice("네트워크 장치 경고", "PokéAPI 로딩 지연이 감지되었습니다. 아래로 다시 드래그해 보세요.", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRandomPokemon();
  }, []);

  // 도감에서 포켓몬 선택 시, 해당 포켓몬의 공식 한국어 설명(스토리)을 PokéAPI에서 동적 로드
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

        // 1. 한국어 도감 설명 탐색
        const koreanFlavorEntry = data.flavor_text_entries.find(
          entry => entry.language.name === "ko"
        );
        // 제어 문자 교정 (\n, \f 등을 자연스러운 띄어쓰기로 변환)
        const cleanDescription = koreanFlavorEntry 
          ? koreanFlavorEntry.flavor_text.replace(/\n|\f/g, " ") 
          : "아직 알려진 도감 정보가 기술되지 않은 희귀 포켓몬입니다.";

        // 2. 한국어 분류(씨앗포켓몬 등) 탐색
        const koreanGenusEntry = data.genera.find(
          g => g.language.name === "ko"
        );
        const cleanCategory = koreanGenusEntry 
          ? koreanGenusEntry.genus 
          : "미분류 포켓몬";

        setSpeciesInfo({
          description: cleanDescription,
          category: cleanCategory
        });
      } catch (err) {
        console.error(err);
        setSpeciesInfo({
          description: "데이터 전송 손상으로 정보를 불러오지 못했습니다. 다시 시도해 주세요.",
          category: "미확인포켓몬"
        });
      } finally {
        setSpeciesLoading(false);
      }
    };

    fetchSpeciesData();
  }, [selectedPokedexItem]);

  // 공통 안내문 다이얼로그
  const triggerNotice = (title, message, type = "info") => {
    setWin95Notice({ show: true, title, message, type });
  };

  // 포획 정답 제출 처리
  const handleAnswerSubmit = (selectedAnswer) => {
    if (captureState !== 'idle') return;
    
    if (selectedAnswer === currentPokemon.name) {
      playSfx('success');
      setCaptureState('throwing');
      setSilhouetteMode(false); // 실루엣 컬러로 잠금 해제

      // 3D 몬스터볼 포획 사이클 연출
      setTimeout(() => {
        setCaptureState('shaking');
        playSfx('shake');
        
        setTimeout(() => { playSfx('shake'); }, 600);
        setTimeout(() => { playSfx('shake'); }, 1200);

        setTimeout(() => {
          setCaptureState('success');
          
          // 소지 확인 후 도감 추가
          if (!caughtList.some(item => item.id === currentPokemon.id)) {
            const newList = [...caughtList, {
              ...currentPokemon,
              caughtAt: new Date().toLocaleDateString()
            }].sort((a, b) => a.id - b.id);
            saveCaughtList(newList);
          }

          // 1.8초 대기 후 다음 포켓몬 자동 로딩
          setTimeout(() => {
            fetchRandomPokemon();
          }, 1800);

        }, 1800);

      }, 1000);

    } else {
      playSfx('fail');
      triggerNotice("포획 실패", `틀렸습니다! 이 실루엣 포켓몬의 본명은 "${selectedAnswer}"이(가) 아닙니다.`, "error");
    }
  };

  // 터치 제스처 연산
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

    if (currentTab === 'quiz' && diffY > 30 && Math.abs(diffX) < 45) {
      setIsPullingDown(true);
    }
  };

  const handleTouchEnd = () => {
    const xThreshold = 90;
    const yThreshold = 110;

    // 아래로 스와이프: 포켓몬 새로고침
    if (currentTab === 'quiz' && isPullingDown && touchDelta.y > yThreshold) {
      playSfx('click');
      fetchRandomPokemon();
    }

    // 좌우 스와이프: 도감 탭 트랜지션
    if (touchDelta.x < -xThreshold && currentTab === 'quiz') {
      playSfx('click');
      setCurrentTab('pokedex');
    }
    if (touchDelta.x > xThreshold && currentTab === 'pokedex') {
      playSfx('click');
      setCurrentTab('quiz');
    }

    setTouchStart({ x: 0, y: 0 });
    setTouchDelta({ x: 0, y: 0 });
    setIsPullingDown(false);
  };

  return (
    <div 
      className="w-full h-[100dvh] flex flex-col justify-between overflow-hidden bg-[#008080] font-mono select-none"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      
      {/* 1. 상단 타이틀바 / 탭 네비게이션 */}
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
          <button 
            onClick={() => { playSfx('click'); setCurrentTab('quiz'); }}
            className={`px-3 py-1 text-xs font-bold transition-all ${
              currentTab === 'quiz' 
                ? 'win95-inset bg-[#e0e0e0] translate-y-[1px]' 
                : 'win95-outset bg-[#c0c0c0]'
            }`}
          >
            🕹️ 포획퀴즈
          </button>
          <button 
            onClick={() => { playSfx('click'); setCurrentTab('pokedex'); }}
            className={`px-3 py-1 text-xs font-bold transition-all ${
              currentTab === 'pokedex' 
                ? 'win95-inset bg-[#e0e0e0] translate-y-[1px]' 
                : 'win95-outset bg-[#c0c0c0]'
            }`}
          >
            📖 내 도감 ({caughtList.length})
          </button>
        </div>
      </header>

      {/* 2. 아래로 스와이프 리프레시 애니메이션 헤더 */}
      {isPullingDown && currentTab === 'quiz' && (
        <div 
          className="absolute left-0 right-0 bg-[#c0c0c0] border-b-2 border-b-[#808080] flex flex-col items-center justify-center py-2 transition-all duration-75 z-10 text-xs text-black"
          style={{ 
            top: '38px', 
            height: `${Math.min(touchDelta.y, 140)}px`,
            opacity: Math.min(touchDelta.y / 100, 1)
          }}
        >
          <div className="animate-bounce mb-1">⬇️</div>
          <p className="font-bold">
            {touchDelta.y > 110 ? "손을 놓으면 다른 포켓몬이 호출됩니다!" : "아래로 힘껏 당기세요"}
          </p>
          <div className="w-1/2 bg-gray-300 h-1.5 mt-1 win95-inset">
            <div 
              className="bg-blue-800 h-full transition-all" 
              style={{ width: `${Math.min((touchDelta.y / 110) * 100, 100)}%` }}
            ></div>
          </div>
        </div>
      )}

      {/* 3. 데스크톱 내부 뷰 영역 */}
      <main className="flex-1 w-full relative overflow-hidden p-2 flex justify-center items-center">
        
        {/* ==================== 포획 퀴즈 화면 (Tab: Quiz) ==================== */}
        <div 
          className={`absolute inset-0 p-2 flex flex-col justify-center items-center transition-transform duration-300 ${
            currentTab === 'quiz' ? 'translate-x-0' : '-translate-x-full pointer-events-none'
          }`}
        >
          <div className="win95-outset w-full max-w-sm flex flex-col bg-[#c0c0c0] shadow-xl max-h-full">
            {/* 상단 윈도우 명칭 */}
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

            {/* 메인 콘텐츠 바디 */}
            <div className="p-3 flex-1 overflow-y-auto flex flex-col justify-between gap-2.5 min-h-0 bg-[#e0e0e0]">
              {loading ? (
                <div className="flex-1 flex flex-col items-center justify-center py-12">
                  <div className="text-4xl animate-spin mb-4">⏳</div>
                  <p className="text-xs font-bold text-gray-800 animate-pulse">PokéAPI 데이터베이스 정렬 중...</p>
                  <p className="text-[10px] text-gray-500 mt-2">스크린을 아래로 스와이프하면 재탐색됩니다.</p>
                </div>
              ) : (
                <>
                  {/* 실루엣 투명 보드 */}
                  <div className="win95-inset relative bg-gradient-to-b from-slate-900 to-zinc-950 flex-1 min-h-[160px] max-h-[25vh] flex items-center justify-center overflow-hidden rounded">
                    <div className="absolute inset-0 opacity-10 pointer-events-none" style={{
                      backgroundImage: 'radial-gradient(#ffffff 2px, transparent 2px)',
                      backgroundSize: '16px 16px'
                    }}></div>

                    <span className="absolute top-2 left-2 text-[9px] text-green-400 font-mono tracking-widest bg-black/80 px-1.5 py-0.5 rounded border border-green-800">
                      INDEX: {String(currentPokemon?.id).padStart(3, '0')}
                    </span>

                    {captureState === 'idle' || captureState === 'throwing' ? (
                      <img 
                        src={currentPokemon?.sprite} 
                        alt="Wild Silhouette"
                        className={`w-32 h-32 md:w-36 md:h-36 object-contain transition-all duration-300 ${
                          silhouetteMode ? 'brightness-0 contrast-200 scale-95' : 'scale-100'
                        }`}
                      />
                    ) : null}

                    {/* 포획 모션 그래픽 피드백 */}
                    {captureState !== 'idle' && (
                      <div className="absolute inset-0 flex items-center justify-center z-10 bg-black/70">
                        <div className="flex flex-col items-center">
                          <div className={`w-14 h-14 relative transition-all duration-300 ${
                            captureState === 'throwing' ? 'animate-bounce scale-110' : ''
                          } ${
                            captureState === 'shaking' ? 'animate-pulse' : ''
                          }`}>
                            <svg viewBox="0 0 100 100" className={`w-full h-full drop-shadow-xl ${
                              captureState === 'shaking' ? 'animate-[spin_1.5s_linear_infinite]' : ''
                            }`}>
                              <circle cx="50" cy="50" r="45" fill="white" stroke="black" strokeWidth="6" />
                              <path d="M 5,50 A 45,45 0 0,1 95,50 Z" fill="#EF4444" stroke="black" strokeWidth="6" />
                              <line x1="5" y1="50" x2="95" y2="50" stroke="black" strokeWidth="6" />
                              <circle cx="50" cy="50" r="14" fill="white" stroke="black" strokeWidth="6" />
                              <circle cx="50" cy="50" r="6" fill={captureState === 'shaking' ? '#FBBF24' : 'white'} />
                            </svg>
                          </div>
                          
                          <div className="mt-3 bg-white border border-black px-2 py-0.5 text-[10px] text-black font-bold font-mono">
                            {captureState === 'throwing' && "몬스터볼 포착 전송!"}
                            {captureState === 'shaking' && "흔들림 신호 제어 중..."}
                            {captureState === 'success' && "🎉 포획 완료! 도감 시스템 업데이트 완료."}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* 퀴즈 타이틀문 */}
                  <div className="text-center py-0.5">
                    <p className="text-[12px] font-bold text-black leading-tight">
                      ❓ 이 실루엣 속 1세대 포켓몬의 진짜 이름은?
                    </p>
                  </div>

                  {/* 선택 보기 */}
                  <div className="grid grid-cols-2 gap-1.5">
                    {choices.map((choice, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleAnswerSubmit(choice)}
                        disabled={captureState !== 'idle'}
                        className="win95-outset active:win95-inset bg-[#c0c0c0] hover:bg-[#d0d0d0] disabled:opacity-60 text-xs font-extrabold py-2 px-1 text-center text-black border-2 border-t-white border-l-white border-b-gray-800 border-r-gray-800 rounded transition-all truncate"
                      >
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


        {/* ==================== 내 도감 화면 (Tab: Pokedex) ==================== */}
        <div 
          className={`absolute inset-0 p-2 flex flex-col justify-center items-center transition-transform duration-300 ${
            currentTab === 'pokedex' ? 'translate-x-0' : 'translate-x-full pointer-events-none'
          }`}
        >
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
                  <p className="text-[11px] text-gray-500 mt-1 max-w-[210px]">
                    퀴즈를 정확히 풀어 야생 포켓몬을 최초 1회 이상 안전하게 포획해 주세요.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-3 gap-1.5">
                  {caughtList.map((pokemon) => (
                    <div 
                      key={pokemon.id}
                      onClick={() => { playSfx('click'); setSelectedPokedexItem(pokemon); }}
                      className="win95-outset active:win95-inset bg-[#d8d8d8] p-1.5 flex flex-col items-center justify-center cursor-pointer hover:bg-white transition-colors rounded"
                    >
                      <div className="w-10 h-10 bg-black/5 rounded flex items-center justify-center overflow-hidden mb-1">
                        <img 
                          src={pokemon.sprite} 
                          alt={pokemon.name} 
                          className="w-9 h-9 object-contain" 
                        />
                      </div>
                      <span className="text-[8px] font-mono text-gray-500 block">
                        No.{String(pokemon.id).padStart(3, '0')}
                      </span>
                      <span className="text-[11px] font-bold text-black truncate w-full text-center">
                        {pokemon.name}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="p-2 border-t border-[#808080] bg-[#c0c0c0] flex justify-end">
              <button 
                onClick={() => {
                  if (confirm("정말 모든 수집 기록을 파기하고 도감을 공장 초기화 상태로 되돌리시겠습니까?")) {
                    playSfx('fail');
                    saveCaughtList([]);
                  }
                }}
                className="win95-outset active:win95-inset text-[9px] px-2 py-1 text-red-700 font-bold hover:bg-red-50"
              >
                도감 하드 리셋
              </button>
            </div>
          </div>
        </div>

      </main>


      {/* 4. 포켓몬 상세 정보 팝업 모달창 (공식 한국어 스토리/설명문 동적 연동) */}
      {selectedPokedexItem && (
        <div className="absolute inset-0 bg-black/60 z-40 flex items-center justify-center p-4">
          <div className="win95-outset w-full max-w-sm flex flex-col bg-[#c0c0c0]">
            
            {/* 상단바 */}
            <div className="win95-titlebar p-1 select-none flex items-center justify-between">
              <span className="text-xs font-bold">도감_스토리_프로파일.exe</span>
              <button 
                onClick={() => { playSfx('click'); setSelectedPokedexItem(null); }}
                className="win95-outset text-black font-extrabold text-xs w-5 h-5 flex items-center justify-center p-0 bg-[#c0c0c0] active:win95-inset"
              >
                ✕
              </button>
            </div>

            {/* 상세 내용 (스탯 대신 공식 스토리 정보 위주로 완전 재정비) */}
            <div className="p-4 bg-[#e0e0e0] flex flex-col gap-3.5 text-xs text-black overflow-y-auto max-h-[65vh]">
              
              <div className="flex gap-3">
                {/* 썸네일 박스 */}
                <div className="win95-inset bg-[#ffffff] w-20 h-20 flex items-center justify-center shrink-0 rounded">
                  <img 
                    src={selectedPokedexItem.sprite} 
                    alt={selectedPokedexItem.name} 
                    className="w-16 h-16 object-contain"
                  />
                </div>
                
                {/* 기본 제원 프로필 */}
                <div className="flex-1 flex flex-col justify-center gap-0.5">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] bg-red-600 text-white font-mono px-1 py-0.2 rounded font-bold">
                      No.{String(selectedPokedexItem.id).padStart(3, '0')}
                    </span>
                    <h3 className="text-sm font-bold text-black font-mono">
                      {selectedPokedexItem.name}
                    </h3>
                  </div>
                  
                  <p className="text-[10px] text-gray-500 italic uppercase">
                    {selectedPokedexItem.englishName}
                  </p>
                  
                  <div className="mt-1 text-[11px] text-gray-700 space-y-0.5 font-sans">
                    <p>⚡ 분류: <strong className="text-blue-900">{speciesLoading ? "스캔 중..." : speciesInfo.category}</strong></p>
                    <p>⚖️ 제원: {selectedPokedexItem.height}m / {selectedPokedexItem.weight}kg</p>
                  </div>
                </div>
              </div>

              {/* 공식 도감 스토리 출력 박스 (CRT 모니터 그린 보드 스타일 구현) */}
              <div className="win95-inset p-3 bg-neutral-950 text-emerald-400 rounded flex flex-col gap-1.5 font-mono">
                <div className="flex justify-between items-center border-b border-emerald-900 pb-1 text-[10px]">
                  <span>📠 DATABASE_FLAVOR_ENTRY_READ</span>
                  <span className="animate-pulse">● READY</span>
                </div>
                
                {speciesLoading ? (
                  <div className="py-6 text-center text-xs tracking-wider animate-pulse text-emerald-500">
                    원격 메인컴퓨터에서 도감 스토리 로그 로딩 중...
                  </div>
                ) : (
                  <div className="py-1 text-[11.5px] leading-relaxed select-text font-medium break-all whitespace-pre-line text-emerald-300">
                    "{speciesInfo.description}"
                  </div>
                )}
              </div>

              {/* 포획 메타데이터 */}
              <div className="flex justify-between items-center text-[9px] text-gray-500 font-mono mt-0.5">
                <span>SYSTEM: RECORDED_SUCCESSFULLY</span>
                <span>분석일시: {selectedPokedexItem.caughtAt || "불명"}</span>
              </div>

            </div>

            {/* 모달 하단 */}
            <div className="p-2 border-t border-[#808080] bg-[#c0c0c0] flex justify-end">
              <button 
                onClick={() => { playSfx('click'); setSelectedPokedexItem(null); }}
                className="win95-outset active:win95-inset px-4 py-1.5 text-xs text-black font-extrabold"
              >
                도감 닫기 (C)
              </button>
            </div>
          </div>
        </div>
      )}


      {/* 5. 에러/공지 다이얼로그 모달 */}
      {win95Notice.show && (
        <div className="absolute inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="win95-outset w-full max-w-xs flex flex-col bg-[#c0c0c0]">
            <div className="win95-titlebar p-1 flex justify-between items-center select-none">
              <span className="text-xs font-bold">{win95Notice.title}</span>
              <button 
                onClick={() => setWin95Notice({ ...win95Notice, show: false })}
                className="win95-outset text-black text-xs w-4 h-4 flex items-center justify-center bg-[#c0c0c0]"
              >
                ✕
              </button>
            </div>
            
            <div className="p-4 bg-[#e0e0e0] flex items-start gap-3">
              <div className="text-2xl shrink-0">
                {win95Notice.type === 'error' ? '❌' : 'ℹ️'}
              </div>
              <p className="text-xs text-black leading-normal mt-0.5">{win95Notice.message}</p>
            </div>
            
            <div className="p-2 bg-[#c0c0c0] border-t border-[#808080] flex justify-end">
              <button 
                onClick={() => { playSfx('click'); setWin95Notice({ ...win95Notice, show: false }); }}
                className="win95-outset active:win95-inset px-4 py-1 text-xs text-black font-bold"
              >
                확인
              </button>
            </div>
          </div>
        </div>
      )}


      {/* 6. 하단 작업 표시줄 */}
      <footer className="h-11 bg-[#c0c0c0] border-t-2 border-t-white flex items-center justify-between px-1 select-none shrink-0 z-20">
        
        <div className="flex items-center gap-1.5 relative">
          <button 
            onClick={() => { playSfx('click'); setStartMenuOpen(!startMenuOpen); }}
            className={`px-2 h-8 flex items-center gap-1 font-bold text-xs text-black border-2 transition-all ${
              startMenuOpen 
                ? 'win95-inset bg-[#d4d4d4] translate-y-[1px]' 
                : 'win95-outset bg-[#c0c0c0]'
            }`}
          >
            <div className="flex flex-wrap w-4 h-3.5 gap-[1px]">
              <div className="w-[7px] h-[6px] bg-red-500"></div>
              <div className="w-[7px] h-[6px] bg-green-500"></div>
              <div className="w-[7px] h-[6px] bg-blue-500"></div>
              <div className="w-[7px] h-[6px] bg-yellow-500"></div>
            </div>
            <span>시작</span>
          </button>

          <div className="win95-inset bg-[#e0e0e0] h-8 px-2.5 flex items-center text-[10px] text-gray-800 font-bold border-l-2">
            📟 {currentTab === 'quiz' ? 'Wild_Pokemon' : 'Pokedex_Library'}
          </div>

          {/* 시작 메뉴 */}
          {startMenuOpen && (
            <div className="absolute bottom-10 left-0 w-48 bg-[#c0c0c0] win95-outset z-30 p-1 space-y-1">
              <div className="bg-[#000080] text-white py-1 px-2 text-[10px] font-bold tracking-widest uppercase">
                POKEMON 95 EDITION
              </div>
              
              <button 
                onClick={() => {
                  playSfx('click');
                  setStartMenuOpen(false);
                  triggerNotice("도움말", "야생 포켓몬 실루엣의 이름을 맞춰 포획하세요! 맞춘 포켓몬은 오른쪽 스와이프 도감 탭에서 확인 및 정밀한 공식 한국어 스토리 설명을 열람할 수 있습니다.");
                }}
                className="w-full text-left text-xs text-black hover:bg-[#000080] hover:text-white px-2 py-1.5 transition-colors"
              >
                ❔ 게임 도움말
              </button>

              <button 
                onClick={() => {
                  playSfx('click');
                  setStartMenuOpen(false);
                  triggerNotice("시스템 버전 정보", "Windows 95 Pokemon Retro Emulator (Ver 4.95.2026) - PokéAPI Live Synchronized Edition");
                }}
                className="w-full text-left text-xs text-black hover:bg-[#000080] hover:text-white px-2 py-1.5 transition-colors"
              >
                ℹ️ 에뮬레이터 정보
              </button>

              <div className="border-t border-[#808080] my-1"></div>

              <button 
                onClick={() => {
                  playSfx('click');
                  setStartMenuOpen(false);
                  fetchRandomPokemon();
                }}
                className="w-full text-left text-xs text-black hover:bg-[#000080] hover:text-white px-2 py-1.5 transition-colors"
              >
                🔄 포켓몬 호출 리로드
              </button>
            </div>
          )}
        </div>

        {/* 시스템 트레이 */}
        <div className="win95-inset px-2.5 h-8 flex items-center gap-2 text-xs text-black bg-[#e0e0e0]">
          <span className="cursor-pointer" onClick={() => { playSfx('success'); }} title="테스트 음 생성">🔊</span>
          <span className="font-bold border-l pl-2 font-mono text-[11px] whitespace-nowrap">
            {sysTime}
          </span>
        </div>

      </footer>

      {/* 스타일 강제 전처리 */}
      <style>{`
        .win95-outset {
          border-style: solid;
          border-width: 2px;
          border-top-color: #ffffff;
          border-left-color: #ffffff;
          border-right-color: #808080;
          border-bottom-color: #808080;
          box-shadow: 1px 1px 0px 0px #000000;
        }
        .win95-inset {
          border-style: solid;
          border-width: 2px;
          border-top-color: #808080;
          border-left-color: #808080;
          border-right-color: #ffffff;
          border-bottom-color: #ffffff;
        }
        .active\\:win95-inset:active {
          border-style: solid;
          border-width: 2px;
          border-top-color: #808080;
          border-left-color: #808080;
          border-right-color: #ffffff;
          border-bottom-color: #ffffff;
          transform: translate(1px, 1px);
          box-shadow: none !important;
        }
        .win95-titlebar {
          background: linear-gradient(90deg, #000080 0%, #1084d0 100%);
          color: #ffffff;
        }
      `}</style>

    </div>
  );
}