import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import styles from './quiz.styles';
import config from '../../config/config';

const QuizTile = ({ quiz, onClick, index, style }) => {
  return (
    <TouchableOpacity onPress={() => onClick(quiz.ID)} style={[styles.quizContainer, style]}>
      <Image 
        source={{ uri: `${config.IMAGE_URL}${quiz.photo}` }}
        style={styles.quizImage} 
      />

      <Text style={styles.quizTitle}>
        Lesson {index + 1} - {quiz.title}
      </Text>
    </TouchableOpacity>
  );
};

export default QuizTile;
