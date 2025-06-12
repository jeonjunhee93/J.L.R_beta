import { useState } from "react";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { motion } from "framer-motion";

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
      gloves: null,
      boots: null,
      weapon: null,
      shield: null,
      ring: null,
      cloak: null,
      belt: null,
      accessory: null,
    },
  });

  const equipmentSlotPosition = {
    helmet: { top: "5%", left: "38%" },
    armor: { top: "35%", left: "38%" },
    gloves: { top: "35%", left: "10%" },
    boots: { top: "70%", left: "38%" },
    weapon: { top: "22%", left: "10%" },
    shield: { top: "22%", left: "66%" },
    ring: { top: "60%", left: "10%" },
    cloak: { top: "5%", left: "66%" },
    belt: { top: "60%", left: "66%" },
    accessory: { top: "22%", left: "38%" },
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">🧙‍♂️ 인생 RPG</h1>

      <div className="relative w-[300px] h-[500px] mx-auto mt-10 mb-6">
        <img
          src="/silhouette.png"
          alt="캐릭터 실루엣"
          className="absolute top-0 left-0 w-full h-full opacity-30"
        />

        {Object.keys(player.equipment).map((slot) => (
          <div
            key={slot}
            className="absolute w-12 h-12 border-2 border-white bg-black/50 text-white text-[10px] flex items-center justify-center rounded"
            style={{
              top: equipmentSlotPosition[slot].top,
              left: equipmentSlotPosition[slot].left,
            }}
          >
            {player.equipment[slot] ? player.equipment[slot].name : slot}
          </div>
        ))}
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-semibold">📝 할 일 추가</h2>
        <div className="flex gap-2 mt-2">
          <Input
            value={taskInput}
            onChange={(e) => setTaskInput(e.target.value)}
            placeholder="할 일을 입력하세요"
          />
          <Button
            onClick={() => {
              if (taskInput.trim()) {
                setTasks([...tasks, taskInput]);
                setTaskInput("");
              }
            }}
          >
            추가
          </Button>
        </div>
        <ul className="mt-4 space-y-2">
          {tasks.map((task, index) => (
            <li key={index} className="bg-gray-100 p-2 rounded shadow">
              {task}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
