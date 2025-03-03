'use client';

import React, { useState, useRef, useEffect } from 'react';

interface DrawnSymbol {
  id: string;
  type: 'stressed' | 'unstressed';
  path: Array<{ x: number; y: number }>;
}

interface PoemSyllable {
  text: string;
  id: string;
  correctStress?: 'stressed' | 'unstressed';
}

interface PoemLine {
  syllables: PoemSyllable[];
  id: string;
}

const PoemScansionTool: React.FC = () => {
  // Sample poem broken into syllables
  const [poem, setPoem] = useState<PoemLine[]>([
    {
      id: 'line1',
      syllables: [
        { text: 'Shall', id: 'l1s1', correctStress: 'unstressed' },
        { text: 'I', id: 'l1s2', correctStress: 'stressed' },
        { text: 'com', id: 'l1s3', correctStress: 'unstressed' },
        { text: 'pare', id: 'l1s4', correctStress: 'stressed' },
        { text: 'thee', id: 'l1s5', correctStress: 'unstressed' },
        { text: 'to', id: 'l1s6', correctStress: 'unstressed' },
        { text: 'a', id: 'l1s7', correctStress: 'unstressed' },
        { text: 'sum', id: 'l1s8', correctStress: 'stressed' },
        { text: 'mer\'s', id: 'l1s9', correctStress: 'unstressed' },
        { text: 'day?', id: 'l1s10', correctStress: 'stressed' },
      ],
    },
    {
      id: 'line2',
      syllables: [
        { text: 'Thou', id: 'l2s1', correctStress: 'unstressed' },
        { text: 'art', id: 'l2s2', correctStress: 'stressed' },
        { text: 'more', id: 'l2s3', correctStress: 'unstressed' },
        { text: 'love', id: 'l2s4', correctStress: 'stressed' },
        { text: 'ly', id: 'l2s5', correctStress: 'unstressed' },
        { text: 'and', id: 'l2s6', correctStress: 'unstressed' },
        { text: 'more', id: 'l2s7', correctStress: 'unstressed' },
        { text: 'tem', id: 'l2s8', correctStress: 'stressed' },
        { text: 'per', id: 'l2s9', correctStress: 'unstressed' },
        { text: 'ate.', id: 'l2s10', correctStress: 'stressed' },
      ],
    },
  ]);

  // State to track drawn symbols
  const [drawnSymbols, setDrawnSymbols] = useState<DrawnSymbol[]>([]);

  // State to track whether to show correct answers
  const [showAnswers, setShowAnswers] = useState(false);

  // State to track current drawing
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentPath, setCurrentPath] = useState<Array<{ x: number; y: number }>>([]);

  // Current selected tool and mode
  const [selectedTool, setSelectedTool] = useState<'pencil' | 'eraser'>('pencil');
  const [selectedMode, setSelectedMode] = useState<'draw' | 'click'>('draw');

  // Refs for canvas
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Map to store syllable positions
  const syllablePositionsRef = useRef<Map<string, { x: number; y: number; width: number; height: number }>>(new Map());

  // Initialize canvas
  useEffect(() => {
    const resizeCanvas = () => {
      if (canvasRef.current && containerRef.current) {
        canvasRef.current.width = containerRef.current.clientWidth;
        canvasRef.current.height = containerRef.current.clientHeight;
        renderCanvas();
      }
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  // Update syllable positions when poem changes
  useEffect(() => {
    updateSyllablePositions();
  }, [poem]);

  // Render canvas when drawn symbols change
  useEffect(() => {
    renderCanvas();
  }, [drawnSymbols, showAnswers]);

  const updateSyllablePositions = () => {
    syllablePositionsRef.current.clear();

    document.querySelectorAll('.poem-syllable').forEach((el) => {
      const syllableEl = el as HTMLElement;
      const id = syllableEl.getAttribute('data-id') || '';
      const rect = syllableEl.getBoundingClientRect();
      const containerRect = containerRef.current?.getBoundingClientRect() || { left: 0, top: 0 };

      syllablePositionsRef.current.set(id, {
        x: rect.left - containerRect.left,
        y: rect.top - containerRect.top,
        width: rect.width,
        height: rect.height,
      });
    });
  };

  const renderCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');

    if (!ctx || !canvas) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw all saved paths
    drawnSymbols.forEach((symbol) => {
    //  if (symbol.path.length > 0) {
        if (symbol.type === 'stressed') {
          // Draw a forward slash for stressed
          const syllablePos = syllablePositionsRef.current.get(symbol.id);
          if (syllablePos) {
            const x = syllablePos.x + syllablePos.width / 2;
            const y = syllablePos.y - 10;

            ctx.strokeStyle = '#6a0dad'; // Purple color
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(x - 8, y + 12);
            ctx.lineTo(x + 8, y - 8);
            ctx.stroke();
          }
        } else if (symbol.type === 'unstressed') {
          // Draw a breve for unstressed
          const syllablePos = syllablePositionsRef.current.get(symbol.id);
          if (syllablePos) {
            const x = syllablePos.x + syllablePos.width / 2;
            const y = syllablePos.y - 10;

            ctx.strokeStyle = '#6a0dad'; // Purple color
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.arc(x, y, 8, 0, Math.PI, false);
            ctx.stroke();
          }
        }
      //}
    });

    // Draw current path if drawing
    if (currentPath.length > 0 && isDrawing) {
      ctx.strokeStyle = 'rgba(106, 13, 173, 0.5)'; // Semi-transparent purple
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(currentPath[0].x, currentPath[0].y);

      for (let i = 1; i < currentPath.length; i++) {
        ctx.lineTo(currentPath[i].x, currentPath[i].y);
      }

      ctx.stroke();
    }

    // Draw correct answers if showAnswers is true
    if (showAnswers) {
      poem.forEach(line => {
        line.syllables.forEach(syllable => {
          const syllablePos = syllablePositionsRef.current.get(syllable.id);

          if (syllablePos && syllable.correctStress) {
            const centerX = syllablePos.x + syllablePos.width / 2;
            const symbolY = syllablePos.y - 10; // Position above user symbols

            ctx.strokeStyle = '#00aa00'; // Green for correct answers
            ctx.lineWidth = 1.5;

            if (syllable.correctStress === 'stressed') {
              // Draw a forward slash for stressed
              ctx.beginPath();
              ctx.moveTo(centerX - 8, symbolY + 12);
              ctx.lineTo(centerX + 8, symbolY - 8);
              ctx.stroke();
            } else if (syllable.correctStress === 'unstressed') {
              // Draw a breve (u) for unstressed
              ctx.beginPath();
              ctx.arc(centerX, symbolY, 8, 0, Math.PI, false);
              ctx.stroke();
            }
          }
        });
      });
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!canvasRef.current || !containerRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - containerRect.left;
    const y = e.clientY - containerRect.top;

    // In click mode, directly mark syllables
    if (selectedMode === 'click') {
      if (selectedTool === 'pencil') {

        // Find closest syllable
        let closestSyllableId = findClosestSyllable(x, y);

        if (closestSyllableId) {
          // Toggle between stressed and unstressed
          const existingSymbol = drawnSymbols.find(s => s.id === closestSyllableId);

          const nextType = existingSymbol?.type === 'stressed' ? 'unstressed' : 'stressed';

          setDrawnSymbols(prev => {
            const newSymbols = [
              ...prev.filter(s => s.id !== closestSyllableId),
              {
                id: closestSyllableId!,
                type: nextType,
                path: []
              }
            ];
            console.log("Updated symbols:", newSymbols);
            return newSymbols;
          });


        }
      } else if (selectedTool === 'eraser') {
        // Find closest syllable and remove its mark
        let closestSyllableId = findClosestSyllable(x, y);

        if (closestSyllableId) {
          setDrawnSymbols(prev => prev.filter(s => s.id !== closestSyllableId));
        }
      }
    } else {
      // Draw mode
      setIsDrawing(true);
      setCurrentPath([{ x, y }]);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {

    if (!isDrawing || selectedMode !== 'draw' || !canvasRef.current || !containerRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - containerRect.left;
    const y = e.clientY - containerRect.top;

    setCurrentPath(prev => [...prev, { x, y }]);

    const ctx = canvasRef.current.getContext('2d');
    if (ctx && currentPath.length > 0) {
      ctx.strokeStyle = '#6a0dad';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(currentPath[currentPath.length - 1].x, currentPath[currentPath.length - 1].y);
      ctx.lineTo(x, y);
      ctx.stroke();
    }
  };

  const findClosestSyllable = (x: number, y: number): string | null => {
    let closestSyllableId: string | null = null;
    let minDistance = Infinity;

    syllablePositionsRef.current.forEach((pos, id) => {
      const centerX = pos.x + pos.width / 2;
      const centerY = pos.y - 20; // Target area above syllable

      const distance = Math.sqrt(Math.pow(centerX - x, 2) + Math.pow(centerY - y, 2));

      if (distance < minDistance && distance < 30) { // 30px threshold
        minDistance = distance;
        closestSyllableId = id;
      }
    });

    return closestSyllableId;
  };

  const analyzeStrokeDirection = (path: Array<{ x: number; y: number }>): 'stressed' | 'unstressed' => {
    if (path.length < 5) return 'unstressed'; // Default if too few points

    // Get start, middle and end points
    const start = path[0];
    const end = path[path.length - 1];

    // Calculate overall direction
    const dx = end.x - start.x;
    const dy = end.y - start.y;

    // Calculate the slope
    const slope = dy / dx;

    // Find maximum y deviation from a straight line
    let maxDeviation = 0;
    const straightLineY = (x: number) => start.y + slope * (x - start.x);

    for (const point of path) {
      const expectedY = straightLineY(point.x);
      const deviation = Math.abs(point.y - expectedY);
      maxDeviation = Math.max(maxDeviation, deviation);
    }

    // Calculate curvature
    const curvatureThreshold = 15;
    const isCurved = maxDeviation > curvatureThreshold;

    // Check for special cases first:

    // Clear diagonal lines
    if (Math.abs(slope) > 0.5 && !isCurved) {
      if (slope < 0) {
        // Downward slope (top-left to bottom-right) is a backslash
        // But in our case a slash (/) is the stressed mark
        return 'stressed';
      } else {
        // Upward slope (bottom-left to top-right) is a forward slash
        // This is less common in handwriting for a stress mark
        return 'stressed';
      }
    }

    // U or curved shape
    if (isCurved) {
      // Find if it's a proper U shape (down then up)
      let firstHalfSlope = 0;
      let secondHalfSlope = 0;

      const midPoint = Math.floor(path.length / 2);

      if (midPoint > 0 && path.length > midPoint + 1) {
        firstHalfSlope = (path[midPoint].y - path[0].y) / (path[midPoint].x - path[0].x);
        secondHalfSlope = (path[path.length - 1].y - path[midPoint].y) /
            (path[path.length - 1].x - path[midPoint].x);
      }

      // If it goes down then up, it's likely a U
      if (firstHalfSlope > 0 && secondHalfSlope < 0) {
        return 'unstressed';
      }
    }

    // Horizontal line or gentle curve is likely unstressed
    if (Math.abs(slope) < 0.3) {
      return 'unstressed';
    }

    // Default based on slope
    return Math.abs(slope) < 0.7 ? 'unstressed' : 'stressed';
  };

  const handleMouseUp = () => {

    if (!isDrawing || selectedMode !== 'draw') {
      setIsDrawing(false);
      setCurrentPath([]);
      return;
    }

    if (currentPath.length < 2) {
      setIsDrawing(false);
      setCurrentPath([]);
      return;
    }

    if (selectedTool === 'pencil' ) {

      // Find the closest syllable to the middle of the path
      const midIdx = Math.floor(currentPath.length / 2);
      const midPoint = currentPath[midIdx];

      let closestSyllableId = findClosestSyllable(midPoint.x, midPoint.y);

      if (closestSyllableId) {
        // Analyze the stroke direction
        const symbolType = analyzeStrokeDirection(currentPath);

        // Add the drawn symbol
        setDrawnSymbols(prev => [
          ...prev.filter(s => s.id !== closestSyllableId), // Remove existing for this syllable
          {
            id: closestSyllableId!,
            type: symbolType,
            path: [...currentPath]
          }
        ]);
      }
    } else if (selectedTool === 'eraser') {

      // Find symbols that intersect with the eraser path
      const symbolIdsToRemove = new Set<string>();

      for (const symbol of drawnSymbols) {
        const syllablePos = syllablePositionsRef.current.get(symbol.id);

        if (syllablePos) {
          const centerX = syllablePos.x + syllablePos.width / 2;
          const centerY = syllablePos.y - 20;

          // Check if any point in the eraser path is near this symbol
          for (const point of currentPath) {
            const distance = Math.sqrt(
                Math.pow(point.x - centerX, 2) +
                Math.pow(point.y - centerY, 2)
            );

            if (distance < 20) { // 20px threshold for eraser
              symbolIdsToRemove.add(symbol.id);
              break;
            }
          }
        }
      }

      if (symbolIdsToRemove.size > 0) {
        setDrawnSymbols(prev =>
            prev.filter(symbol => !symbolIdsToRemove.has(symbol.id))
        );
      }
    }


    // Reset drawing state
    setIsDrawing(false);
    setCurrentPath([]);
  };

  const checkAnswers = () => {
    // Get all syllables with markings
    const userMarkings = new Map<string, 'stressed' | 'unstressed'>();

    drawnSymbols.forEach(symbol => {
      userMarkings.set(symbol.id, symbol.type);
    });

    let correct = 0;
    let total = 0;

    poem.forEach(line => {
      line.syllables.forEach(syllable => {
        if (syllable.correctStress) {
          total++;
          const userMark = userMarkings.get(syllable.id);
          if (userMark && userMark === syllable.correctStress) {
            correct++;
          }
        }
      });
    });

    alert(`You got ${correct} out of ${total} correct! (${Math.round((correct / total) * 100)}%)`);
    setShowAnswers(true);
  };

  const resetExercise = () => {
    setDrawnSymbols([]);
    setShowAnswers(false);
  };

  const addSymbolDirectly = (syllableId: string, type: 'stressed' | 'unstressed') => {
    const syllablePos = syllablePositionsRef.current.get(syllableId);
    if (!syllablePos) return;

    // Remove any existing symbol for this syllable
    setDrawnSymbols(prev => {
      const newSymbols = [
        ...prev.filter(s => s.id !== syllableId),
        {
          id: syllableId,
          type: type,
          path: []
        }
      ];
      return newSymbols;
    });
  };

  return (
      <div className="poem-scansion-tool" style={{
        fontFamily: 'Georgia, serif',
        maxWidth: '800px',
        margin: '0 auto',
        padding: '20px',
        backgroundColor: '#f8f5ff',
        color: '#333'
      }}>
        <h1 style={{ color: '#4a0080', textAlign: 'center' }}>Poetcraft Scansion Tool</h1>

        <div className="tool-controls" style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          marginBottom: '20px',
        }}>
          {/* Mode Selection */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
            <button
                onClick={() => setSelectedMode('draw')}
                style={{
                  backgroundColor: selectedMode === 'draw' ? '#6a0dad' : '#e0d4f0',
                  color: selectedMode === 'draw' ? 'white' : '#4a0080',
                  border: 'none',
                  padding: '8px 16px',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontWeight: 'bold'
                }}
            >
              Drawing Mode
            </button>
            <button
                onClick={() => setSelectedMode('click')}
                style={{
                  backgroundColor: selectedMode === 'click' ? '#6a0dad' : '#e0d4f0',
                  color: selectedMode === 'click' ? 'white' : '#4a0080',
                  border: 'none',
                  padding: '8px 16px',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontWeight: 'bold'
                }}
            >
              Click Mode
            </button>
          </div>

          {/* Tool Selection */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
            <button
                onClick={() => setSelectedTool('pencil')}
                style={{
                  backgroundColor: selectedTool === 'pencil' ? '#6a0dad' : '#e0d4f0',
                  color: selectedTool === 'pencil' ? 'white' : '#4a0080',
                  border: 'none',
                  padding: '8px 16px',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontWeight: 'bold'
                }}
            >
              {selectedMode === 'draw' ? 'Drawing Tool' : 'Mark Stress'}
            </button>
            <button
                onClick={() => setSelectedTool('eraser')}
                style={{
                  backgroundColor: selectedTool === 'eraser' ? '#6a0dad' : '#e0d4f0',
                  color: selectedTool === 'eraser' ? 'white' : '#4a0080',
                  border: 'none',
                  padding: '8px 16px',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontWeight: 'bold'
                }}
            >
              Eraser
            </button>
          </div>

          {/* Quick Symbol Selection - Only shown in Click Mode */}
          {selectedMode === 'click' && selectedTool === 'pencil' && (
              <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '5px' }}>
                <button
                    onClick={() => setSelectedTool('pencil')}
                    style={{
                      backgroundColor: '#e0d4f0',
                      color: '#4a0080',
                      border: '2px solid #6a0dad',
                      padding: '8px 16px',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontWeight: 'bold',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '5px'
                    }}
                >
              <span style={{
                display: 'inline-block',
                transform: 'rotate(-30deg)',
                fontSize: '18px',
                fontWeight: 'bold'
              }}>/</span>
                  Stressed
                </button>
                <button
                    onClick={() => setSelectedTool('pencil')}
                    style={{
                      backgroundColor: '#e0d4f0',
                      color: '#4a0080',
                      border: '2px solid #6a0dad',
                      padding: '8px 16px',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontWeight: 'bold',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '5px'
                    }}
                >
              <span style={{
                display: 'inline-block',
                fontSize: '18px',
                fontWeight: 'bold'
              }}>u</span>
                  Unstressed
                </button>
              </div>
          )}
        </div>

        <div className="instructions" style={{
          backgroundColor: '#e0d4f0',
          padding: '15px',
          borderRadius: '8px',
          marginBottom: '20px',
          color: '#4a0080'
        }}>
          {selectedMode === 'draw' ? (
              <>
                <p>Draw stress marks above each syllable:</p>
                <ul style={{ marginLeft: '20px' }}>
                  <li>For stressed syllables, draw a forward slash (/) above the syllable</li>
                  <li>For unstressed syllables, draw a curved line (u) above the syllable</li>
                </ul>
                <p>The tool will interpret your drawing and mark the syllable accordingly.</p>
              </>
          ) : (
              <>
                <p>Click above each syllable to mark its stress:</p>
                <ul style={{ marginLeft: '20px' }}>
                  <li>First click adds a stress mark (/)</li>
                  <li>Second click changes to unstressed (u)</li>
                  <li>Third click removes the mark</li>
                </ul>
                <p>Use the eraser tool to remove marks if needed.</p>
              </>
          )}
        </div>

        <div
            ref={containerRef}
            className="poem-container"
            style={{
              position: 'relative',
              backgroundColor: 'white',
              padding: '40px 20px 20px',
              borderRadius: '8px',
              boxShadow: '0 2px 8px rgba(106, 13, 173, 0.2)',
              minHeight: '200px'
            }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
        >
          <canvas
              ref={canvasRef}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: 1
              }}
          />

          <div className="poem-text" style={{
            fontSize: '18px',
            lineHeight: '2.5',
            position: 'relative',
            zIndex: 0,
            pointerEvents: 'none'
          }}>
            {poem.map((line) => (
                <div key={line.id} className="poem-line" style={{ marginBottom: '20px' }}>
                  {line.syllables.map((syllable) => (
                      <span
                          key={syllable.id}
                          data-id={syllable.id}
                          className="poem-syllable"
                          style={{
                            display: 'inline-block',
                            padding: '0 4px',
                            position: 'relative'
                          }}
                      >
                  {syllable.text}
                </span>
                  ))}
                </div>
            ))}
          </div>

          {/* Clickable overlay for syllables in click mode */}
          {selectedMode === 'click' && (
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 2 }}>
                {poem.map((line) => (
                    <div key={`overlay-${line.id}`} style={{ height: '2.5em', marginBottom: '20px' }}>
                      {line.syllables.map((syllable) => {
                        const pos = syllablePositionsRef.current.get(syllable.id);
                        if (!pos) return null;

                        return (
                            <div
                                key={`overlay-${syllable.id}`}

                                style={{
                                  position: 'absolute',
                                  left: pos.x,
                                  top: pos.y - 30, // Above the syllable
                                  width: pos.width,
                                  height: 30,
                                  cursor: 'pointer'
                                }}
                            />
                        );
                      })}
                    </div>
                ))}
              </div>
          )}
        </div>

        <div className="symbol-legend" style={{
          backgroundColor: 'white',
          padding: '15px',
          borderRadius: '8px',
          marginTop: '20px',
          marginBottom: '20px',
          boxShadow: '0 2px 8px rgba(106, 13, 173, 0.1)',
          display: 'flex',
          justifyContent: 'space-around'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <div style={{
              width: '30px',
              height: '30px',
              position: 'relative',
              border: '1px solid #e0d4f0',
              borderRadius: '4px'
            }}>
              <div style={{
                position: 'absolute',
                top: '5px',
                left: '5px',
                width: '20px',
                height: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <span style={{ transform: 'rotate(-30deg)', fontWeight: 'bold', color: '#6a0dad' }}>/</span>
              </div>
            </div>
            <span>Stressed syllable</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <div style={{
              width: '30px',
              height: '30px',
              position: 'relative',
              border: '1px solid #e0d4f0',
              borderRadius: '4px'
            }}>
              <div style={{
                position: 'absolute',
                top: '5px',
                left: '5px',
                width: '20px',
                height: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <span style={{ fontWeight: 'bold', color: '#6a0dad' }}>u</span>
              </div>
            </div>
            <span>Unstressed syllable</span>
          </div>
        </div>

        <div className="action-buttons" style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '15px',
          marginTop: '20px'
        }}>
          <button
              onClick={checkAnswers}
              style={{
                backgroundColor: '#4a0080',
                color: 'white',
                border: 'none',
                padding: '10px 20px',
                borderRadius: '4px',
                cursor: 'pointer',
                fontWeight: 'bold'
              }}
          >
            Check My Answer
          </button>
          <button
              onClick={resetExercise}
              style={{
                backgroundColor: '#e0d4f0',
                color: '#4a0080',
                border: 'none',
                padding: '10px 20px',
                borderRadius: '4px',
                cursor: 'pointer',
                fontWeight: 'bold'
              }}
          >
            Reset
          </button>
        </div>
      </div>
  );
};

export default PoemScansionTool;
