import { Editor } from "@tiptap/react"

type Operation = {
  name: string,
  active: (editor: Editor) => boolean,
  toggle: (editor: Editor) => void
}

export const editorOperations: Operation[]  = [
  {
    name: "Blockquote",
    active: (editor) => editor.isActive("blockquote"),
    toggle: (editor) => editor.chain().focus().toggleBlockquote().run(),
  },
  {
    name: "Bullet Points",
    active: (editor) => editor.isActive("bulletList"),
    toggle: (editor) => editor.chain().focus().toggleBulletList().run(),
  },
  {
    name: "Code",
    active: (editor) => editor.isActive("code"),
    toggle: (editor) => editor.chain().focus().toggleCode().run(),
  },
  {
    name: "Code Block",
    active: (editor) => editor.isActive("codeBlock"),
    toggle: (editor) => editor.chain().focus().toggleCodeBlock().run(),
  },
  {
    name: "Strike",
    active: (editor) => editor.isActive("strike"),
    toggle: (editor) => editor.chain().focus().toggleStrike().run(),
  },
  {
    name: "H1",
    active: (editor) => editor.isActive("heading", { level: 1 }),
    toggle: (editor) => editor.chain().focus().toggleHeading({ level: 1 }).run(),
  },
  {
    name: "H2",
    active: (editor) => editor.isActive("heading", { level: 2 }),
    toggle: (editor) => editor.chain().focus().toggleHeading({ level: 2 }).run(),
  },
  {
    name: "H3",
    active: (editor) => editor.isActive("heading", { level: 3 }),
    toggle: (editor) => editor.chain().focus().toggleHeading({ level: 3 }).run(),
  },
  {
    name: "H4",
    active: (editor) => editor.isActive("heading", { level: 4 }),
    toggle: (editor) => editor.chain().focus().toggleHeading({ level: 4 }).run(),
  },
  {
    name: "H5",
    active: (editor) => editor.isActive("heading", { level: 5 }),
    toggle: (editor) => editor.chain().focus().toggleHeading({ level: 5 }).run(),
  },
  {
    name: "H6",
    active: (editor) => editor.isActive("heading", { level: 6 }),
    toggle: (editor) => editor.chain().focus().toggleHeading({ level: 6 }).run(),
  },
]