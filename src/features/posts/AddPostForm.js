import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addNewPost } from './postsSlice';
import { selectAllUsers } from '../users/usersSlice';
import { useNavigate } from 'react-router-dom';

const AddPostForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [userId, setUserId] = useState('');
  const [addRequestStatus, setAddRequestStatus] = useState('idle');

  const users = useSelector(selectAllUsers);

  const onTitleChange = (e) => setTitle(e.target.value);
  const onContentChange = (e) => setContent(e.target.value);
  const onAuthorChange = (e) => setUserId(e.target.value);

  const canSave =
    [title, content, userId].every(Boolean) && addRequestStatus === 'idle';

  const onSavePostClicked = () => {
    if (canSave) {
      try {
        setAddRequestStatus('pending');
        dispatch(addNewPost({ title, body: content, userId })).unwrap();

        setTitle('');
        setContent('');
        setUserId('');
        navigate('/');
      } catch (error) {
        console.log('Failed to save', error);
      } finally {
        setAddRequestStatus('idle');
      }
    }
  };

  const userOptions = users.map((user) => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ));

  return (
    <section>
      <h2>Add new post</h2>
      <form>
        <label htmlFor='postTitle'>Post Title:</label>
        <input
          type='text'
          id='postTitle'
          name='postTitle'
          value={title}
          onChange={onTitleChange}
        />
        <label htmlFor='postAuthor'>Post Author:</label>
        <select
          type='text'
          id='postAuthor'
          name='postAuthor'
          value={userId}
          onChange={onAuthorChange}
        >
          <option value=''>--Select--</option>
          {userOptions}
        </select>
        <label htmlFor='postContent'>Content:</label>
        <input
          type='text'
          id='postContent'
          name='postContent'
          value={content}
          onChange={onContentChange}
        />
        <button onClick={onSavePostClicked} type='button' disabled={!canSave}>
          Save Post
        </button>
      </form>
    </section>
  );
};

export default AddPostForm;
