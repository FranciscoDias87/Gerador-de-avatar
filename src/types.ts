/**
 * Types and interfaces for the Avatar Generator Educational Coding Game.
 */

export enum LevelStatus {
  LOCKED = "LOCKED",
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETED = "COMPLETED"
}

export interface Avatar {
  name: string;
  url: string;
}

export interface GameLevel {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  professorTip: string;
  marketTip: string;
  xpValue: number;
  codeSnippet: string; // The reference code shown in the PDF
}

export interface CodeBlock {
  id: string;
  content: string;
  order: number; // The correct logical sequence order
}

export interface DragMatchItem {
  id: string;
  variableName: string;
  correctSelector: string;
}
