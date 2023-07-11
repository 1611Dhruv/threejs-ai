import Customizer from "@/components/Customizer";
import Home from "@/components/Home";
import { CanvasModel } from "@/components/canvas";
import Image from "next/image";
export default function App() {
  return (
    <main className="app transition-all ease-in">
      <Home />
      <Customizer />
      <CanvasModel />
    </main>
  );
}
