enum MessageType {
  ADD_MESSAGE = "add-message",
  FUNCTION_CALL = "function-call",
  FUNCTION_CALL_RESULT = "function-call-result",
  TRANSCRIPT = "transcript",
}

enum MessageRole {
  ASSISTANT = "assistant",
  SYSTEM = "system",
  USER = "user",
}

enum TranscriptMessageType {
  PARTIAL = "partial",
  FINAL = "final",
}

interface BaseMessage {
  type: MessageType;
}

interface TranscriptMessage extends BaseMessage {
  type: MessageType.TRANSCRIPT;
  role: MessageRole;
  transcriptType: TranscriptMessageType;
  transcript: string;
}

interface FunctionCallMessage extends BaseMessage {
  type: MessageType.FUNCTION_CALL;
  functionCall: {
    name: string;
    parameters: unknown;
  };
}

interface FunctionCallResultMessage extends BaseMessage {
  type: MessageType.FUNCTION_CALL_RESULT;
  functionCallResult: {
    forwardToClientEnabled?: boolean;
    result: unknown;
    [a: string]: unknown;
  };
}

type Message =
  | TranscriptMessage
  | FunctionCallMessage
  | FunctionCallResultMessage;
