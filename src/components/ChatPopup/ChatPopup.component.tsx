import { useState } from "react";
import {
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Typography,
  Box,
} from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import CloseIcon from "@mui/icons-material/Close";
import { useAskMessage } from "../../hooks/openAi/useAskMessage";

interface Message {
  text: string;
  sender: "user" | "bot";
}

export const ChatPopup = () => {
  const { mutateAsync: askMessage } = useAskMessage();
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messageHistory, setMessageHistory] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!message) return;

    setMessageHistory((prev) => [...prev, { text: message, sender: "user" }]);
    setLoading(true);

    try {
      const res = await askMessage({
        question: message,
      });

      setMessageHistory((prev) => [
        ...prev,
        { text: res.answer, sender: "bot" },
      ]);
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setLoading(false);
      setMessage("");
    }
  };

  return (
    <div>
      <IconButton
        onClick={toggleChat}
        color="primary"
        size="large"
        style={{
          position: "fixed",
          right: 20,
          bottom: 20,
          backgroundColor: "#007bff",
          color: "white",
        }}
      >
        <ChatIcon fontSize="large" />
      </IconButton>

      <Dialog
        open={isOpen}
        onClose={toggleChat}
        fullWidth
        maxWidth="sm"
        sx={{
          position: "fixed",
          right: 0,
          bottom: 0,
          margin: 0,
          height: "auto",
          top: "auto",
          transform: "none",
        }}
        BackdropProps={{
          style: { backgroundColor: "transparent" },
        }}
        PaperProps={{
          style: {
            margin: 0,
            right: 20,
            bottom: 80,
            position: "fixed",
            width: "300px",
          },
        }}
      >
        <DialogTitle>
          Chat with us!
          <IconButton
            onClick={toggleChat}
            style={{ position: "absolute", right: 10, top: 10 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent>
          <Box
            sx={{
              maxHeight: "400px",
              overflowY: "auto",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            {messageHistory.length > 0 ? (
              messageHistory.map((msg, index) => (
                <Typography
                  key={index}
                  sx={{
                    alignSelf:
                      msg.sender === "user" ? "flex-end" : "flex-start",
                    backgroundColor:
                      msg.sender === "user" ? "#007bff" : "#f1f1f1",
                    color: msg.sender === "user" ? "#fff" : "#000",
                    padding: "10px",
                    borderRadius: "10px",
                    maxWidth: "80%",
                  }}
                >
                  {msg.text}
                </Typography>
              ))
            ) : (
              <Typography>How can we help you today?</Typography>
            )}
          </Box>
        </DialogContent>

        <form onSubmit={handleSubmit}>
          <DialogActions>
            <TextField
              fullWidth
              variant="outlined"
              label="Type your message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              disabled={loading}
            />
            <Button
              type="submit"
              color="primary"
              variant="contained"
              disabled={loading}
            >
              {loading ? "Sending..." : "Send"}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
};
