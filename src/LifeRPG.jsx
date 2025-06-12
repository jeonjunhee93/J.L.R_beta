import { useState } from 'react';
import './index.css';

function LifeRPG() {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState('');
  const [xp, setXp] = useState(0);
  const [gold, setGold] = useState(0);
  const [level, setLevel] = useState(1);
  const [inventory, setInventory] = useState([]);
  const [equipment, setEquipment] = useState({
    weapon: null,
    armor: null,
    helmet: null,
    gloves: null,
    boots: null,
    necklace: null,
    ring: null,
    cloak: null,
    belt: null,
    shield: null,
  });

  const rarityColors = {
    common: 'gray',
    normal: 'white',
    rare: 'blue',
    epic: 'purple',
    legendary: 'red',
  };

  const generateRandomItem = () => {
    const parts = Object.keys(equipment);
    const part = parts[Math.floor(Math.random() * parts.length)];
    const rarities = ['common', 'normal', 'rare', 'epic', 'legendary'];
    const weights = [50, 30, 15, 4, 1];
    const sum = weights.reduce((a, b) => a + b);
    const rand = Math.random() * sum;
    let acc = 0, rarity;
    for (let i = 0; i < rarities.length; i++) {
      acc += weights[i];
      if (rand < acc) {
        rarity = rarities[i];
        break;
      }
    }
    return {
      name: `${rarity.toUpperCase()} ${part}`,
      part,
      rarity,
    };
  };

  const handleAddTask = () => {
    if (taskInput.trim() === '') return;
    const newTask = { text: taskInput, completed: false };
    setTasks([...tasks, newTask]);
    setTaskInput('');
  };

  const handleComplete = (index) => {
    const updated = [...tasks];
    updated[index].completed = true;
    setTasks(updated);
    const rewardItem = generateRandomItem();
    setInventory([...inventory, rewardItem]);

    const newXp = xp + 10;
    const newGold = gold + 5;
    setXp(newXp);
    setGold(newGold);
    if (newXp >= level * 100) {
      setLevel(level + 1);
      setXp(newXp - level * 100);
    }
  };

  const handleEquip = (item) => {
    setEquipment({ ...equipment, [item.part]: item });
    setInventory(inventory.filter((i) => i !== item));
  };

  const handleSell = (item) => {
    setGold(gold + 10);
    setInventory(inventory.filter((i) => i !== item));
  };

  const handleRestPurchase = (type) => {
    const cost = 30;
    if (gold >= cost) {
      alert(`${type} 30분을 구매했습니다! 즐거운 시간 보내세요.`);
      setGold(gold - cost);
    } else {
      alert('골드가 부족합니다.');
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '2rem' }}>
      <div style={{ marginRight: '2rem' }}>
        <h2>📋 할 일</h2>
        <input
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
          placeholder="할 일 입력"
        />
        <button onClick={handleAddTask}>추가</button>
        <ul>
          {tasks.map((task, i) => (
            <li key={i}>
              {task.text} {task.completed ? '✅' : <button onClick={() => handleComplete(i)}>완료</button>}
            </li>
          ))}
        </ul>

        <h2>🎒 인벤토리</h2>
        <ul>
          {inventory.map((item, i) => (
            <li key={i}>
              <span style={{ color: rarityColors[item.rarity] }}>{item.name}</span>
              <button onClick={() => handleEquip(item)}>장착</button>
              <button onClick={() => handleSell(item)}>판매</button>
            </li>
          ))}
        </ul>

        <h2>☕ 휴식</h2>
        <button onClick={() => handleRestPurchase('유튜브 시청')}>유튜브 30분</button>
        <button onClick={() => handleRestPurchase('게임 플레이')}>게임 30분</button>
      </div>

      <div>
        <h2>🧍 장비창</h2>
        <div style={{ position: 'relative', width: '200px', height: '400px', backgroundColor: '#eee', borderRadius: '10px' }}>
          <div style={{ position: 'absolute', top: '10px', left: '80px' }}>{equipment.helmet?.name || '🪖'}</div>
          <div style={{ position: 'absolute', top: '60px', left: '80px' }}>{equipment.armor?.name || '👕'}</div>
          <div style={{ position: 'absolute', top: '60px', left: '10px' }}>{equipment.weapon?.name || '🗡'}</div>
          <div style={{ position: 'absolute', top: '60px', right: '10px' }}>{equipment.shield?.name || '🛡'}</div>
          <div style={{ position: 'absolute', top: '120px', left: '80px' }}>{equipment.belt?.name || '🧷'}</div>
          <div style={{ position: 'absolute', top: '170px', left: '80px' }}>{equipment.boots?.name || '👞'}</div>
          <div style={{ position: 'absolute', top: '120px', left: '10px' }}>{equipment.ring?.name || '💍'}</div>
          <div style={{ position: 'absolute', top: '120px', right: '10px' }}>{equipment.necklace?.name || '📿'}</div>
          <div style={{ position: 'absolute', top: '220px', left: '10px' }}>{equipment.gloves?.name || '🧤'}</div>
          <div style={{ position: 'absolute', top: '220px', right: '10px' }}>{equipment.cloak?.name || '🧥'}</div>
        </div>

        <div style={{ marginTop: '1rem' }}>레벨 {level} | 💰 {gold}골드</div>
      </div>
    </div>
  );
}

export default LifeRPG;
