import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import silhouette from "/src/silhouette.png"; // ✅ 실루엣 이미지 경로

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
      luck: 5
    },
    equipment: {
      helmet: null,
      armor: null,
      weapon: null,
      shield: null,
      gloves: null,
      boots: null,
      ring: null,
      cloak: null,
      belt: null,
      accessory: null
    }
  });

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">🧙 인생 RPG</h1>

      {/* 실루엣 배경 + 장비창 */}
      <div className="relative w-[300px] h-[500px] mx-auto bg-gray-100 rounded-lg overflow-hidden border shadow">
        {/* 실루엣 이미지 */}
        <img
          src={silhouette}
          alt="Silhouette"
          className="absolute inset-0 w-full h-full object-contain opacity-30 z-0"
        />

        {/* 장비 슬롯들 */}
        <div className="absolute top-4 left-[50%] translate-x-[-50%] z-10">
          🎩 {player.equipment.helmet || "머리"}
        </div>
        <div className="absolute top-20 left-[50%] translate-x-[-50%] z-10">
          🛡 {player.equipment.armor || "몸통"}
        </div>
        <div className="absolute top-36 left-[15%] z-10">
          🗡 {player.equipment.weapon || "무기"}
        </div>
        <div className="absolute top-36 right-[15%] z-10">
          🛡 {player.equipment.shield || "방패"}
        </div>
        <div className="absolute bottom-36 left-[20%] z-10">
          🧤 {player.equipment.gloves || "장갑"}
        </div>
        <div className="absolute bottom-36 right-[20%] z-10">
          👞 {player.equipment.boots || "신발"}
        </div>
        <div className="absolute bottom-24 left-[50%] translate-x-[-50%] z-10">
          🔗 {player.equipment.belt || "허리"}
        </div>
        <div className="absolute bottom-16 left-[30%] z-10">
          💍 {player.equipment.ring || "반지"}
        </div>
        <div className="absolute bottom-16 right-[30%] z-10">
          🧿 {player.equipment.accessory || "장신구"}
        </div>
        <div className="absolute bottom-6 left-[50%] translate-x-[-50%] z-10">
          🧥 {player.equipment.cloak || "망토"}
        </div>
      </div>
    </div>
  );
}
