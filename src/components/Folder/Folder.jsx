import { useRef, useState } from 'react';
import './Folder.css';

const darkenColor = (hex, percent) => {
  let color = hex.startsWith('#') ? hex.slice(1) : hex;
  if (color.length === 3) color = color.split('').map((c) => c + c).join('');
  const num = parseInt(color, 16);
  let r = (num >> 16) & 0xff;
  let g = (num >> 8) & 0xff;
  let b = num & 0xff;
  r = Math.max(0, Math.min(255, Math.floor(r * (1 - percent))));
  g = Math.max(0, Math.min(255, Math.floor(g * (1 - percent))));
  b = Math.max(0, Math.min(255, Math.floor(b * (1 - percent))));
  return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
};

const Folder = ({
  color = '#5227FF',
  size = 1,
  items = [],
  className = '',
  open: openProp,
  onToggle,
  onItemClick,
}) => {
  const maxItems = 3;
  const requestedCount = Math.min(items.length || 1, maxItems);
  const paperRefs = useRef([]);
  const frameRefs = useRef([]);
  const papers = items.slice(0, requestedCount);
  while (papers.length < requestedCount) papers.push(null);

  const isControlled = openProp !== undefined;
  const [openInternal, setOpenInternal] = useState(false);
  const open = isControlled ? openProp : openInternal;

  const folderBackColor = darkenColor(color, 0.08);
  const paper1 = darkenColor('#ffffff', 0.1);
  const paper2 = darkenColor('#ffffff', 0.05);
  const paper3 = '#ffffff';

  const setPaperMagnet = (index, x, y) => {
    const paper = paperRefs.current[index];
    if (!paper) return;
    paper.style.setProperty('--magnet-x', `${x}px`);
    paper.style.setProperty('--magnet-y', `${y}px`);
  };

  const resetPaperMagnet = (index) => {
    if (frameRefs.current[index]) {
      cancelAnimationFrame(frameRefs.current[index]);
      frameRefs.current[index] = null;
    }
    setPaperMagnet(index, 0, 0);
  };

  const resetAllPaperMagnets = () => {
    for (let i = 0; i < requestedCount; i += 1) resetPaperMagnet(i);
  };

  const handleFolderClick = () => {
    if (isControlled) onToggle?.();
    else setOpenInternal((p) => !p);
    if (open) resetAllPaperMagnets();
  };

  const handlePaperClick = (e, index) => {
    if (!open) return;
    e.stopPropagation();
    onItemClick?.(index);
  };

  const handlePaperPointerMove = (e, index) => {
    if (!open) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const nextX = (e.clientX - cx) * 0.12;
    const nextY = (e.clientY - cy) * 0.12;

    if (frameRefs.current[index]) cancelAnimationFrame(frameRefs.current[index]);
    frameRefs.current[index] = requestAnimationFrame(() => {
      setPaperMagnet(index, nextX, nextY);
      frameRefs.current[index] = null;
    });
  };

  const handlePaperPointerLeave = (_e, index) => {
    resetPaperMagnet(index);
  };

  const folderStyle = {
    '--folder-color': color,
    '--folder-back-color': folderBackColor,
    '--paper-1': paper1,
    '--paper-2': paper2,
    '--paper-3': paper3,
  };

  return (
    <div style={{ transform: `scale(${size})` }} className={className}>
      <div
        className={`folder${open ? ' open' : ''}`}
        style={folderStyle}
        data-paper-count={requestedCount}
        onClick={handleFolderClick}
      >
        <div className="folder__back">
          {papers.map((item, i) => (
            <div
              key={i}
              className={`paper paper-${i + 1}`}
              ref={(node) => {
                paperRefs.current[i] = node;
              }}
              onClick={(e) => handlePaperClick(e, i)}
              onPointerMove={(e) => handlePaperPointerMove(e, i)}
              onPointerLeave={(e) => handlePaperPointerLeave(e, i)}
            >
              {item}
            </div>
          ))}
          <div className="folder__front" />
          <div className="folder__front right" />
        </div>
      </div>
    </div>
  );
};

export default Folder;
