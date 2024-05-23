import { useState } from "react";
import { useDispatch } from "react-redux";
import { addComment, removeComment } from "../redux/taskSlice";
import { Box, Button, Input, Text, List, ListItem, Stack } from "@chakra-ui/react";

const TaskEditor = ({ task }) => {
  const [commentText, setCommentText] = useState("");
  const dispatch = useDispatch();

  const handleAddComment = () => {
    if (commentText.trim()) {
      dispatch(addComment({ taskId: task.id, text: commentText }));
      setCommentText("");
    }
  };

  return (
    <Box>
      <Stack spacing={3}>
        <Input
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          placeholder="New Comment"
        />
        <Button onClick={handleAddComment} colorScheme="teal">
          Add Comment
        </Button>
      </Stack>
      <List spacing={3} mt={6}>
        {task.comments.map((comment) => (
          <ListItem key={comment.id} display="flex" justifyContent="space-between" alignItems="center" p={2}>
            <Text>{comment.text}</Text>
            <Button size="sm" onClick={() => dispatch(removeComment({ taskId: task.id, commentId: comment.id }))}>
              Delete
            </Button>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default TaskEditor;
