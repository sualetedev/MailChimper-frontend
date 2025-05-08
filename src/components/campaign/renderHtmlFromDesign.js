export const renderHtmlFromDesign = (design) => {
    return new Promise((resolve, reject) => {
      const containerId = `temp-editor-${Date.now()}`;
      const container = document.createElement("div");
      container.id = containerId;
      container.style.position = "absolute";
      container.style.left = "-9999px";
      document.body.appendChild(container);
  
      const editor = new window.unlayer.Editor({
        id: containerId,
        displayMode: "email",
        container,
      });
  
      editor.addEventListener("editor:ready", () => {
        editor.loadDesign(design);
        editor.addEventListener("design:loaded", () => {
          editor.exportHtml((data) => {
            document.body.removeChild(container);
            resolve(data.html);
          });
        });
      });
  
      editor.addEventListener("editor:error", (err) => {
        reject(err);
      });
    });
  };


