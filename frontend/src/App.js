import { useEffect, useState } from 'react';
import { shallow } from 'zustand/shallow';
import { PipelineToolbar } from './toolbar';
import { PipelineUI } from './ui';
import { SubmitButton, useSubmitPipeline } from './submit';
import { useStore } from './store';
import './App.css';

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
  savePipelineToStorage: state.savePipelineToStorage,
  loadPipelineFromStorage: state.loadPipelineFromStorage,
});

function App() {
  const [onSidebarNodeClick, setOnSidebarNodeClick] = useState(() => () => false);
  const { nodes, edges, savePipelineToStorage, loadPipelineFromStorage } = useStore(
    selector,
    shallow
  );
  const handleRun = useSubmitPipeline();

  useEffect(() => {
    loadPipelineFromStorage();
  }, [loadPipelineFromStorage]);

  const handleExportJson = () => {
    const payload = JSON.stringify({ nodes, edges }, null, 2);
    const blob = new Blob([payload], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = 'pipeline.json';
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="app-shell">
      <header className="top-toolbar">
        <div className="top-toolbar__left">
          <button type="button" className="btn btn--secondary" onClick={handleRun}>
            Run
          </button>
          <button type="button" className="btn btn--secondary" onClick={savePipelineToStorage}>
            Save
          </button>
          <button type="button" className="btn btn--secondary" onClick={handleExportJson}>
            Export JSON
          </button>
        </div>
        <div className="top-toolbar__right">
          <SubmitButton />
        </div>
      </header>
      <main className="app-main">
        <aside className="app-sidebar">
          <PipelineToolbar onNodeClickAdd={onSidebarNodeClick} />
        </aside>
        <section className="app-canvas">
          <PipelineUI onReadyAddNodeByClick={setOnSidebarNodeClick} />
        </section>
      </main>
    </div>
  );
}

export default App;
