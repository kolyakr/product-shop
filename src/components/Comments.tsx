import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../redux/store";
import {
  getComments,
  addComment,
  deleteComment,
} from "../redux/comments/operations";
import { useState } from "react";
import { Comment } from "../types";
import {
  selectComments,
  selectCommentsLoading,
  selectCommentsError,
} from "../redux/comments/selectors";
import { formatDate } from "../utils/formateDate";

const Comments: React.FC<{ productId: string }> = ({ productId }) => {
  const dispatch = useDispatch<AppDispatch>();
  const comments = useSelector(selectComments);
  const isLoading = useSelector(selectCommentsLoading);
  const error = useSelector(selectCommentsError);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    if (productId !== null) {
      dispatch(getComments(productId));
    }
  }, [dispatch, productId]);

  const handleAddComment = () => {
    if (newComment.trim()) {
      const comment: Comment = {
        id: Date.now().toString(),
        productId,
        description: newComment,
        date: formatDate(new Date()),
      };
      dispatch(addComment(comment));
      setNewComment("");
    }
  };

  const handleDeleteComment = (id: string) => {
    dispatch(deleteComment(id));
  };

  return (
    <div className="mt-4">
      {isLoading && <p>Loading comments...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {comments.length > 0 ? (
        <ul className="list-disc pl-5">
          {comments.map((comment: Comment) => (
            <li key={comment.id} className="mt-2 flex justify-between">
              <div>
                <span className="font-semibold">{comment.date}:</span>{" "}
                {comment.description}
              </div>
              <button
                onClick={() => handleDeleteComment(comment.id!)}
                className="text-red-500 hover:underline"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No comments yet.</p>
      )}
      <div className="mt-4 flex gap-2">
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="border p-2 flex-grow rounded-lg"
          placeholder="Add a comment..."
        />
        <button
          onClick={handleAddComment}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg"
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default Comments;
