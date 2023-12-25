import React, { useState, useEffect } from 'react';
import sendRequest from '../SendRequest';

const CommentsModalContentRemove = () => {
    const [comments, setComments] = useState([]);
    const userId = sessionStorage.getItem("userId");

    useEffect(() => {
        // Получаем все комментарии с сервера
        sendRequest('/api/Categories/GetAllComments', 'GET')
            .then(response => {
                setComments(response);
            })
            .catch(error => {
                console.error('Ошибка при загрузке комментариев:', error);
            });
    }, []);

    const handleToggleCommentVisibility = (commentId) => {
        // Логика изменения видимости комментария на сервере
        sendRequest('/api/Categories/ToggleCommentVisibility', 'PUT', null, { commentId })
            .then(response => {
                // Успешное изменение видимости комментария, обновляем состояние
                setComments(comments.map(comment => {
                    if (comment.commentId === commentId) {
                        return { ...comment, isVisible: !comment.isVisible };
                    }
                    return comment;
                }));
            })
            .catch(error => {
                console.error('Ошибка при изменении видимости комментария:', error);
            });
    };

    return (
        <div className="comments-list">
            <h2>Все комментарии</h2>
            {comments.map(comment => (
                <div key={comment.commentId} className={`comment-item ${comment.isVisible ? 'visible' : 'hidden'}`}>
                    <p>Пользователь: {comment.userName}</p>
                    <p>{comment.commentText}</p>
                    <p>Оценка: {comment.rating}</p>
                    <p>Дата: {comment.commentDate}</p>
                    {userId && (
                        <button onClick={() => handleToggleCommentVisibility(comment.commentId)}>
                            {comment.isVisible ? 'Скрыть' : 'Показать'}
                        </button>
                    )}
                </div>
            ))}
        </div>
    );
};

export default CommentsModalContentRemove;
