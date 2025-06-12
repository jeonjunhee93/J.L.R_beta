import { useState } from "react";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import silhouette from "../silhouette.png"; // 실루엣 이미지 경로

export default function LifeRPG() {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState("");
  const [player, setPlayer] = useState({
    level: 1,
    xp: 0,
    gold: 0,
    inventory: [],
    stats: {
      strength: 5,
      intelligence: 5,
      luck: 5,
    },
    equipment: {
      helmet: null,
      armor: null,
      weapon: null,
      boots: null,
      gloves: null,
      shield: null,
      ring: null,
      cloak: null,
      belt: null,
      accessory: null,
    },
  });

  const addTask = () => {
    if (taskInput.trim() === "") return;
    const xpGain = 10 + Math.floor(Math.random() * 10);
    const goldGain = 5 + Math.floor(Math.random() * 5);
    const newTask = {
      description: taskInput,
      xp: xpGain,
      gold: goldGain,
    };
    setTasks([...tasks, newTask]);
    setPlayer((prev) => ({
      ...prev,
      xp: prev.xp + xpGain,
      gold: prev.gold + goldGain,
    }));
    setTaskInput("");
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">🧙‍♂️ 인생 RPG</h1>
      <p className="text-lg mb-6">현실 할 일을 게임처럼!</p>

      {/* 할 일 입력 */}
      <div className="flex gap-2 mb-6">
        <Input
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
          placeholder="예: 집 청소하기, 이메일 보내기 등"
        />
        <Button onClick={addTask}>추가</Button>
      </div>

      {/* 할 일 목록 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {tasks.map((task, index) => (
          <Card key={index}>
            <CardContent className="p-4">
              <p className="font-medium">{task.description}</p>
              <p className="text-sm text-gray-500">
                +{task.xp} XP / +{task.gold} 골드
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* 장비창 UI */}
      <div className="flex flex-col md:flex-row gap-6 items-center justify-center">
        <div className="relative w-64 h-96">
          <img
            src={silhouette}
            alt="character silhouette"
            className="w-full h-full object-contain opacity-20"
          />
          {Object.entries(player.equipment).map(([slot, item], index) => (
            <div
              key={slot}
              className="absolute bg-white/30 border border-white rounded p-1 text-xs text-center text-black"
              style={{
                top: equipmentSlotPosition[slot].top,
                left: equipmentSlotPosition[slot].left,
                width: "80px",
              }}
            >
              {slot.toUpperCase()}
              <div className="text-[10px]">{item || "비어있음"}</div>
            </div>
          ))}
        </div>

        {/* 플레이어 정보 */}
        <div className="space-y-2">
          <p>🎖 레벨: {player.level}</p>
          <p>📊 경험치: {player.xp}</p>
          <p>💰 골드: {player.gold}</p>
          <p>💪 힘: {player.stats.strength}</p>
          <p>🧠 지능: {player.stats.intelligence}</p>
          <p>🍀 운: {player.stats.luck}</p>
        </div>
      </div>
    </div>
  );
}

// 장비 슬롯 위치 지정 (절대 좌표, 이미지에 맞춰 조절)
const equipmentSlotPosition = {
  helmet: { top: "5%", left: "38%" },
  armor: { top: "30%", left: "38%" },
  weapon: { top: "45%", left: "10%" },
  shield: { top: "45%", left: "66%" },
  gloves: { top: "37%", left: "10%" },
  boots: { top: "80%", left: "38%" },
  ring: { top: "15%", left: "66%" },
  cloak: { top: "10%", left: "10%" },
  belt: { top: "55%", left: "38%" },
  accessory: { top: "22%", left: "66%" },
};
