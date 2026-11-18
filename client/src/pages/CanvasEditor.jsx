
import React, { useEffect, useRef, useState } from "react";
import "./CanvasEditor.css";

const CANVAS_WIDTH = 900;
const CANVAS_HEIGHT = 560;

function CanvasEditor() {
  const canvasRef = useRef(null);
  const fileRef = useRef(null);
  const undoStack = useRef([]);
  const redoStack = useRef([]);
  const dragRef = useRef(null);

  const [elements, setElements] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [activeTool, setActiveTool] = useState("select");
  const [textInput, setTextInput] = useState("Your text here");
  const [textColor, setTextColor] = useState("#222222");
  const [fontSize, setFontSize] = useState(36);
  const [shapeColor, setShapeColor] = useState("#9566f4");
  const [message, setMessage] = useState("");

  const selectedElement = elements.find(
    (element) => element.id === selectedId
  );

  // Save previous state before an edit
  const saveHistory = () => {
    undoStack.current.push(
      JSON.parse(JSON.stringify(elements))
    );
    redoStack.current = [];
  };

  const updateElements = (nextElements) => {
    saveHistory();
    setElements(nextElements);
  };

  // Draw all elements on the canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    elements.forEach((element) => {
      if (element.type === "image") {
        const img = new Image();

        img.onload = () => {
          ctx.save();
          ctx.filter = element.filter || "none";
          ctx.drawImage(
            img,
            element.x,
            element.y,
            element.width,
            element.height
          );
          ctx.restore();

          if (selectedId === element.id) {
            drawSelection(ctx, element);
          }
        };

        img.src = element.src;
      }

      if (element.type === "text") {
        ctx.save();
        ctx.fillStyle = element.color;
        ctx.font = `bold ${element.fontSize}px Arial`;
        ctx.textBaseline = "top";
        ctx.fillText(element.text, element.x, element.y);
        ctx.restore();

        if (selectedId === element.id) {
          drawSelection(ctx, {
            ...element,
            width: Math.max(
              80,
              ctx.measureText(element.text).width
            ),
            height: element.fontSize + 10
          });
        }
      }

      if (element.type === "rectangle") {
        ctx.fillStyle = element.color;
        ctx.fillRect(
          element.x,
          element.y,
          element.width,
          element.height
        );

        if (selectedId === element.id) {
          drawSelection(ctx, element);
        }
      }

      if (element.type === "circle") {
        ctx.beginPath();
        ctx.fillStyle = element.color;
        ctx.ellipse(
          element.x + element.width / 2,
          element.y + element.height / 2,
          element.width / 2,
          element.height / 2,
          0,
          0,
          Math.PI * 2
        );
        ctx.fill();

        if (selectedId === element.id) {
          drawSelection(ctx, element);
        }
      }
    });
  }, [elements, selectedId]);

  const drawSelection = (ctx, element) => {
    ctx.save();
    ctx.strokeStyle = "#9566f4";
    ctx.lineWidth = 2;
    ctx.setLineDash([6, 4]);
    ctx.strokeRect(
      element.x - 4,
      element.y - 4,
      element.width + 8,
      element.height + 8
    );
    ctx.restore();
  };

  // Upload an image
  const handleUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setMessage("Please select an image file.");
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      const img = new Image();

      img.onload = () => {
        const scale = Math.min(
          1,
          400 / img.width,
          350 / img.height
        );

        const newElement = {
          id: Date.now(),
          type: "image",
          src: reader.result,
          x: (CANVAS_WIDTH - img.width * scale) / 2,
          y: (CANVAS_HEIGHT - img.height * scale) / 2,
          width: img.width * scale,
          height: img.height * scale,
          filter: "none"
        };

        updateElements([...elements, newElement]);
        setSelectedId(newElement.id);
        setMessage("Image added to canvas.");
      };

      img.src = reader.result;
    };

    reader.readAsDataURL(file);
    event.target.value = "";
  };

  // Add text
  const addText = () => {
    if (!textInput.trim()) {
      setMessage("Enter some text first.");
      return;
    }

    const newElement = {
      id: Date.now(),
      type: "text",
      text: textInput,
      x: 300,
      y: 250,
      color: textColor,
      fontSize: Number(fontSize),
      width: 200,
      height: Number(fontSize) + 10
    };

    updateElements([...elements, newElement]);
    setSelectedId(newElement.id);
    setActiveTool("select");
    setMessage("Text added.");
  };

  // Add shapes
  const addShape = (type) => {
    const newElement = {
      id: Date.now(),
      type,
      x: 330,
      y: 200,
      width: type === "circle" ? 150 : 200,
      height: 130,
      color: shapeColor
    };

    updateElements([...elements, newElement]);
    setSelectedId(newElement.id);
    setActiveTool("select");
    setMessage(`${type} added.`);
  };

  // Select and move elements
  const getCanvasPosition = (event) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();

    return {
      x: (event.clientX - rect.left) *
        (CANVAS_WIDTH / rect.width),
      y: (event.clientY - rect.top) *
        (CANVAS_HEIGHT / rect.height)
    };
  };

  const handlePointerDown = (event) => {
    const position = getCanvasPosition(event);

    const clickedElement = [...elements].reverse().find((element) => {
      let width = element.width;
      let height = element.height;

      if (element.type === "text") {
        const ctx = canvasRef.current.getContext("2d");
        ctx.font = `bold ${element.fontSize}px Arial`;
        width = Math.max(80, ctx.measureText(element.text).width);
        height = element.fontSize + 10;
      }

      return (
        position.x >= element.x - 5 &&
        position.x <= element.x + width + 5 &&
        position.y >= element.y - 5 &&
        position.y <= element.y + height + 5
      );
    });

    if (clickedElement) {
      setSelectedId(clickedElement.id);
      dragRef.current = {
        id: clickedElement.id,
        startX: position.x,
        startY: position.y,
        originalElements: JSON.parse(JSON.stringify(elements))
      };
    } else {
      setSelectedId(null);
      dragRef.current = null;
    }
  };

  const handlePointerMove = (event) => {
    if (!dragRef.current) return;

    const position = getCanvasPosition(event);
    const { id, startX, startY } = dragRef.current;

    setElements((previous) =>
      previous.map((element) =>
        element.id === id
          ? {
              ...element,
              x: element.x + position.x - startX,
              y: element.y + position.y - startY
            }
          : element
      )
    );

    dragRef.current.startX = position.x;
    dragRef.current.startY = position.y;
  };

  const handlePointerUp = () => {
    if (dragRef.current) {
      undoStack.current.push(dragRef.current.originalElements);
      redoStack.current = [];
      dragRef.current = null;
    }
  };

  // Update selected element properties
  const updateSelected = (changes) => {
    if (!selectedId) return;

    updateElements(
      elements.map((element) =>
        element.id === selectedId
          ? { ...element, ...changes }
          : element
      )
    );
  };

  // Delete selected element
  const deleteSelected = () => {
    if (!selectedId) return;

    updateElements(
      elements.filter((element) => element.id !== selectedId)
    );

    setSelectedId(null);
    setMessage("Element deleted.");
  };

  // Undo
  const handleUndo = () => {
    if (undoStack.current.length === 0) return;

    redoStack.current.push(
      JSON.parse(JSON.stringify(elements))
    );

    setElements(undoStack.current.pop());
    setSelectedId(null);
  };

  // Redo
  const handleRedo = () => {
    if (redoStack.current.length === 0) return;

    undoStack.current.push(
      JSON.parse(JSON.stringify(elements))
    );

    setElements(redoStack.current.pop());
    setSelectedId(null);
  };

  // Download design
  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const exportCanvas = document.createElement("canvas");
    exportCanvas.width = CANVAS_WIDTH;
    exportCanvas.height = CANVAS_HEIGHT;

    const ctx = exportCanvas.getContext("2d");
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    const drawElement = (index) => {
      if (index >= elements.length) {
        const link = document.createElement("a");
        link.download = "imagine-ai-design.png";
        link.href = exportCanvas.toDataURL("image/png");
        link.click();
        return;
      }

      const element = elements[index];

      if (element.type === "image") {
        const img = new Image();

        img.onload = () => {
          ctx.save();
          ctx.filter = element.filter || "none";
          ctx.drawImage(
            img,
            element.x,
            element.y,
            element.width,
            element.height
          );
          ctx.restore();
          drawElement(index + 1);
        };

        img.onerror = () => drawElement(index + 1);
        img.src = element.src;
        return;
      }

      if (element.type === "text") {
        ctx.fillStyle = element.color;
        ctx.font = `bold ${element.fontSize}px Arial`;
        ctx.textBaseline = "top";
        ctx.fillText(element.text, element.x, element.y);
      }

      if (element.type === "rectangle") {
        ctx.fillStyle = element.color;
        ctx.fillRect(
          element.x,
          element.y,
          element.width,
          element.height
        );
      }

      if (element.type === "circle") {
        ctx.beginPath();
        ctx.fillStyle = element.color;
        ctx.ellipse(
          element.x + element.width / 2,
          element.y + element.height / 2,
          element.width / 2,
          element.height / 2,
          0,
          0,
          Math.PI * 2
        );
        ctx.fill();
      }

      drawElement(index + 1);
    };

    drawElement(0);
  };

  return (
    <div className="canvas-editor-page">

      {/* SIDEBAR */}
      <aside className="editor-sidebar">
        <h2 className="editor-logo">
          Imagine<span>AI</span>
        </h2>

        <p className="editor-menu-title">WORKSPACE</p>

        <nav className="editor-nav">
          <a href="/dashboard">Dashboard</a>
          <a href="/community">Community</a>
          <a href="/prompt-store">Prompt Store</a>
          <a href="/dashboard">Favorites</a>
          <a href="/subscription">Subscription</a>

          <p className="editor-menu-title">CREATE</p>

          <a href="/create-image">Image Generation</a>
          <a href="/canvas-editor" className="active">
            Canvas Editor
          </a>
          <a href="/texture-generation">Texture Generation</a>
          <a href="/motion-generation">Motion Generation</a>

          <p className="editor-menu-title">PREFERENCES</p>
          <a href="/settings">Settings</a>
        </nav>
      </aside>

      {/* EDITOR MAIN */}
      <main className="editor-main">

        <header className="editor-header">
          <div>
            <h1>Canvas Editor</h1>
            <p>Edit, customize and bring your designs to life.</p>
          </div>

          <div className="editor-header-actions">
            <button onClick={handleUndo}>↶ Undo</button>
            <button onClick={handleRedo}>↷ Redo</button>
            <button
              className="editor-download"
              onClick={handleDownload}
            >
              ↓ Download PNG
            </button>
          </div>
        </header>

        <div className="editor-layout">

          {/* LEFT TOOL PANEL */}
          <section className="editor-tools">

            <h3>Tools</h3>

            <button
              className={activeTool === "select" ? "tool-active" : ""}
              onClick={() => setActiveTool("select")}
            >
              <span>↖</span> Select & Move
            </button>

            <button onClick={() => fileRef.current.click()}>
              <span>＋</span> Upload Image
            </button>

            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              hidden
              onChange={handleUpload}
            />

            <div className="editor-tool-divider" />

            <h4>Add Elements</h4>

            <div className="editor-element-buttons">
              <button onClick={addText}>T Add Text</button>
              <button onClick={() => addShape("rectangle")}>
                ▭ Rectangle
              </button>
              <button onClick={() => addShape("circle")}>
                ◯ Circle
              </button>
            </div>

            <div className="editor-tool-divider" />

            <h4>Text Settings</h4>

            <label>Text</label>
            <input
              type="text"
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
            />

            <label>Text Color</label>
            <input
              className="editor-color-input"
              type="color"
              value={textColor}
              onChange={(e) => setTextColor(e.target.value)}
            />

            <label>Font Size: {fontSize}px</label>
            <input
              type="range"
              min="12"
              max="90"
              value={fontSize}
              onChange={(e) => setFontSize(e.target.value)}
            />

            <button className="editor-add-text" onClick={addText}>
              Add Text to Canvas
            </button>

            <div className="editor-tool-divider" />

            <h4>Shape Color</h4>
            <input
              className="editor-color-input"
              type="color"
              value={shapeColor}
              onChange={(e) => setShapeColor(e.target.value)}
            />

          </section>

          {/* CENTER CANVAS */}
          <section className="editor-center">

            <div className="editor-canvas-toolbar">
              <span>Untitled Design</span>
              <span>900 × 560 px</span>
            </div>

            <div className="editor-canvas-area">
              <canvas
                ref={canvasRef}
                width={CANVAS_WIDTH}
                height={CANVAS_HEIGHT}
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onPointerLeave={handlePointerUp}
              />
            </div>

            <p className="editor-canvas-hint">
              Select an element and drag it to move it around.
            </p>

            {message && (
              <p className="editor-message">{message}</p>
            )}

          </section>

          {/* RIGHT PROPERTIES PANEL */}
          <section className="editor-properties">

            <h3>Properties</h3>

            {selectedElement ? (
              <>
                <p className="editor-selected-type">
                  Selected: {selectedElement.type}
                </p>

                {selectedElement.type === "text" && (
                  <>
                    <label>Text Content</label>
                    <input
                      value={selectedElement.text}
                      onChange={(e) =>
                        updateSelected({ text: e.target.value })
                      }
                    />

                    <label>Font Size</label>
                    <input
                      type="number"
                      min="8"
                      max="120"
                      value={selectedElement.fontSize}
                      onChange={(e) =>
                        updateSelected({
                          fontSize: Number(e.target.value)
                        })
                      }
                    />

                    <label>Text Color</label>
                    <input
                      type="color"
                      className="editor-color-input"
                      value={selectedElement.color}
                      onChange={(e) =>
                        updateSelected({ color: e.target.value })
                      }
                    />
                  </>
                )}

                {(selectedElement.type === "rectangle" ||
                  selectedElement.type === "circle") && (
                  <>
                    <label>Shape Color</label>
                    <input
                      type="color"
                      className="editor-color-input"
                      value={selectedElement.color}
                      onChange={(e) =>
                        updateSelected({ color: e.target.value })
                      }
                    />

                    <label>Width</label>
                    <input
                      type="number"
                      value={Math.round(selectedElement.width)}
                      onChange={(e) =>
                        updateSelected({
                          width: Math.max(10, Number(e.target.value))
                        })
                      }
                    />

                    <label>Height</label>
                    <input
                      type="number"
                      value={Math.round(selectedElement.height)}
                      onChange={(e) =>
                        updateSelected({
                          height: Math.max(10, Number(e.target.value))
                        })
                      }
                    />
                  </>
                )}

                {selectedElement.type === "image" && (
                  <>
                    <label>Image Filter</label>
                    <select
                      value={selectedElement.filter}
                      onChange={(e) =>
                        updateSelected({ filter: e.target.value })
                      }
                    >
                      <option value="none">Original</option>
                      <option value="grayscale(100%)">Grayscale</option>
                      <option value="sepia(100%)">Sepia</option>
                      <option value="brightness(130%)">Bright</option>
                      <option value="contrast(150%)">High Contrast</option>
                    </select>

                    <label>Width</label>
                    <input
                      type="number"
                      value={Math.round(selectedElement.width)}
                      onChange={(e) =>
                        updateSelected({
                          width: Math.max(10, Number(e.target.value))
                        })
                      }
                    />

                    <label>Height</label>
                    <input
                      type="number"
                      value={Math.round(selectedElement.height)}
                      onChange={(e) =>
                        updateSelected({
                          height: Math.max(10, Number(e.target.value))
                        })
                      }
                    />
                  </>
                )}

                <button
                  className="editor-delete-btn"
                  onClick={deleteSelected}
                >
                  Delete Selected Element
                </button>
              </>
            ) : (
              <p className="editor-no-selection">
                Select an element on the canvas to edit its properties.
              </p>
            )}

            <div className="editor-tool-divider" />

            <h3>Layers</h3>

            <div className="editor-layers">
              {elements.length === 0 ? (
                <p className="editor-no-selection">
                  No layers yet. Upload an image or add an element.
                </p>
              ) : (
                [...elements].reverse().map((element) => (
                  <button
                    key={element.id}
                    className={
                      selectedId === element.id
                        ? "editor-layer selected-layer"
                        : "editor-layer"
                    }
                    onClick={() => setSelectedId(element.id)}
                  >
                    <span>
                      {element.type === "text" ? "T" :
                        element.type === "image" ? "▧" : "◈"}
                    </span>
                    {element.type === "text"
                      ? element.text
                      : element.type === "image"
                        ? "Image"
                        : element.type}
                  </button>
                ))
              )}
            </div>

          </section>

        </div>

      </main>
    </div>
  );
}

export default CanvasEditor;
