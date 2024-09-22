import { useMyPresence, useOthers } from '@/liveblocks.config';
import LiveCursors from './cursor/LiveCursors';
import { useCallback, useEffect, useState } from 'react';
import CursorChat from './cursor/CursorChat';
import { CursorMode } from '@/types/type';
import Cursor from './cursor/Cursor';

const Live = () => {
  const others = useOthers();
  const [{ cursor }, updateMyPresence] = useMyPresence() as any;
  const [cursorState, setCursorState] = useState({
    mode: CursorMode.Hidden,
  })

  // Cursor Location Function
  // -- Handles the tracking of the location of the cursor on the screen.
  const handlePointerMove = useCallback((event: React.PointerEvent) => {
    event.preventDefault;

    const x = event.clientX - event.currentTarget.getBoundingClientRect().x;
    const y = event.clientY - event.currentTarget.getBoundingClientRect().y;

    updateMyPresence({ cursor: { x, y } });
  }, []);


  // Cursor Leave Screen Function
  // -- Sets the cursor / message to null when the cursor is not on the screen.
  const handlePointerLeave = useCallback((event: React.PointerEvent) => {
    setCursorState({ mode: CursorMode.Hidden });

    updateMyPresence({ cursor: null, message: null });
  }, []);


  // Cursor Click Function (down)
  // -- Handles the tracking of the location of the cursor on the screen.
  const handlePointerDown = useCallback((event: React.PointerEvent) => {
    const x = event.clientX - event.currentTarget.getBoundingClientRect().x;
    const y = event.clientY - event.currentTarget.getBoundingClientRect().y;

    updateMyPresence({ cursor: { x, y } });
  }, []);


  // Keeps track of the keyboard events
  useEffect(() => {
    const onKeyUp = (e: KeyboardEvent) => {
      if (e.key === '/') {
        setCursorState({
          mode: CursorMode.Chat,
          previousMessage: null,
          message: '',
        })
      } else if (e.key === 'Escape') {
        // Removes any message that was typed
        updateMyPresence({ message: ' ' })

        // Hides the cursor mode.
        setCursorState({
          mode: CursorMode.Hidden,
        })
      }
    }

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === '/') {
        // Prevents the browser default for when the user types "/"
        e.preventDefault;
      }
    }

    // Modifies the window object to add an event listener for keyup / keydown.
    // When these are detected, they call the corresponding functions.
    return () => {
      window.addEventListener('keyup', onKeyUp);
      window.addEventListener('keydown', onKeyDown)
    }
  }, [updateMyPresence])
  return (
    <div
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onPointerDown={handlePointerDown}
      className='h-[100vh] text-center w-full flex justify-center items-center'
    >

      <h1 className="text-2xl text-white">Liveblocks Figma Clone</h1>

      {cursor && (
        <CursorChat
          cursor={cursor}
          cursorState={cursorState}
          setCursorState={setCursorState}
          updateMyPresence={updateMyPresence}
        />
      )}
      <LiveCursors others={others} />

    </div>
  )
}

export default Live