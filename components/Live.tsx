import { useMyPresence, useOthers } from '@/liveblocks.config';
import LiveCursors from './cursor/LiveCursors';
import { useCallback } from 'react';

const Live = () => {
  const others = useOthers();
  const [{ cursor }, updateMyPresence] = useMyPresence() as any;


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
    event.preventDefault;

    updateMyPresence({ cursor: null, message: null });
  }, []);


  // Cursor Click Function (down)
  // -- Handles the tracking of the location of the cursor on the screen.
  const handlePointerDown = useCallback((event: React.PointerEvent) => {
    const x = event.clientX - event.currentTarget.getBoundingClientRect().x;
    const y = event.clientY - event.currentTarget.getBoundingClientRect().y;

    updateMyPresence({ cursor: { x, y } });
  }, []);


  return (
    <div
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onPointerDown={handlePointerDown}
      className='h-[100vh] text-center w-full flex justify-center items-center'
    >
      <LiveCursors others={others} />

    </div>
  )
}

export default Live