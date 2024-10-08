import CursorSVG from '@/public/assets/CursorSVG'
import { CursorChatProps, CursorMode } from '@/types/type'

// { cursorState.mode === CursorMode.Chat && (

// )}

const CursorChat = ({ cursor, cursorState, setCursorState, updateMyPresence }: CursorChatProps) => {
  // Handle Change Function
  // -- Gets the event of the input element change.
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // update the presence by adding a message to it. Value contains the value typed.
    updateMyPresence({ message: e.target.value });

    // modify the cursor state
    setCursorState({
      mode: CursorMode.Chat,
      previousMessage: null,
      message: e.target.value,
    })
  }

  // Handle Key Down Function
  // -- Monitors for the enter key within the input element to submit the message.
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // runs only if the user hits the 'enter' key.
    if (e.key === 'Enter') {
      // Set the cursor state to be the mode of cursor chat.
      setCursorState({
        mode: CursorMode.Chat,
        previousMessage: cursorState.message,
        message: '',
      })
    } else if (e.key === 'Escape') {
      setCursorState({
        mode: CursorMode.Hidden,
      })
    }


  }

  return (
    <div className='absolute top-0 left-0' style={{ transform: `translateX(${cursor.x}px) translateY(${cursor.y}px)` }}>
      {cursorState.mode === CursorMode.Chat && (
        <>
          <CursorSVG color="#000" />
          <div className='absolute left-2 top-5 bg-blue-500 px-4 py-2 text-sm leading-relaxed text-white rounded-[20px]'>
            {cursorState.previousMessage && (
              <div>{cursorState.previousMessage}</div>
            )}
            <input
              className='z-10 w-60 border-none bg-transparent text-white placeholder-blue-300 outline-none'
              autoFocus={true}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              placeholder={cursorState.previousMessage ? "" : "Type a message..."}
              value={cursorState.message}
              maxLength={50}
            />
          </div>
        </>
      )}


    </div>
  )
}

export default CursorChat