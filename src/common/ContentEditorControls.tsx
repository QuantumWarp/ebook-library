import { ArrowDropDown } from "@mui/icons-material";
import { Box, ButtonGroup, Button, Grid2, Menu, MenuItem } from "@mui/material";
import { Editor } from "@tiptap/react";
import { ReactNode, useState } from "react";
import { editorOperations } from "./editor-operations";

type ContentEditorControlsProps = {
  children: ReactNode;
  editor: Editor;
}

export function ContentEditorControls({ children, editor }: ContentEditorControlsProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);  
  return (
    <Box display="flex" justifyContent="space-between">
      <Grid2 container spacing={2}>
        <ButtonGroup>
          <Button
            variant={editor.isActive("heading", { level: 3 }) ? "contained" : "outlined"}
            onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          >
            Header
          </Button>
          <Button
            variant={editor.isActive("bold") ? "contained" : "outlined"}
            onClick={() => editor.chain().focus().toggleBold().run()}
          >
            Bold
          </Button>
          <Button
            variant={editor.isActive("italic") ? "contained" : "outlined"}
            onClick={() => editor.chain().focus().toggleItalic().run()}
          >
            Italic
          </Button>
        </ButtonGroup>

        <Button
          variant="outlined"
          onClick={(event) => setAnchorEl(event.currentTarget)}
          endIcon={<ArrowDropDown />}
        >
          More
        </Button>
        
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={() => setAnchorEl(null)}
        >
          {editorOperations.map((x) => (
            <MenuItem
              key={x.name}
              selected={x.active(editor)}
              onClick={() => x.toggle(editor)}
            >
              {x.name}
            </MenuItem>
          ))}
        </Menu>
      </Grid2>

      <Box>
        {children}
      </Box>
    </Box>
  )
}