// src/pages/Feedbacks.tsx
import { useState } from 'react';
import styles from './styles.module.css'; // Crie este arquivo para os estilos

const feedbacks = [
    {
        id: 1,
        title: 'Feedback 1',
        description: 'Descrição do feedback 1',
        imageUrl: 'link-da-imagem-1.jpg' // Altere para o link da imagem
    },
    {
        id: 2,
        title: 'Feedback 2',
        description: 'Descrição do feedback 2',
        imageUrl: 'link-da-imagem-2.jpg' // Altere para o link da imagem
    },
    {
        id: 3,
        title: 'Feedback 3',
        description: 'Descrição do feedback 3',
        imageUrl: 'link-da-imagem-3.jpg' // Altere para o link da imagem
    },
    {
        id: 4,
        title: 'Feedback 4',
        description: 'Descrição do feedback 4',
        imageUrl: 'link-da-imagem-4.jpg' // Altere para o link da imagem
    },
    // Adicione mais feedbacks conforme necessário
];

export default function Feedbacks() {
    return (
        <div className={styles.feedbacksContainer}>
            <h1>Feedbacks do Projeto</h1>
            <div className={styles.cardContainer}>
                {feedbacks.map(feedback => (
                    <div key={feedback.id} className={styles.card}>
                        <img src={feedback.imageUrl} alt={feedback.title} className={styles.image} />
                        <h2>{feedback.title}</h2>
                        <p>{feedback.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
