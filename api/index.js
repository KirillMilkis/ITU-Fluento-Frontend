/*
 * File: index.js
 * Author: 
 * Date Created: 5.11.2024
 * Note:
 */

import getAllQuizzes from "./getAllQuizzes";
import greetUser from "./greetUser";
import getUserInfo from "./getUserInfo";
import getQuizLevels from "./getQuizLevels";
import getQuizzesByLevel from "./getQuizzesByLevel";
import getQuizzesByUser from "./getQuizzesByUser";
import createQuiz from "./quizCreation/createQuiz";
import addGrammar from "./quizCreation/addGrammar";
import getGrammars from "./quizCreation/getGrammars";
import getQuizById from "./quizCreation/getQuizById";
import getQuestionById from "./quizCreation/getQuestionById";
import updateQuiz from "./quizCreation/updateQuiz";
import deleteQuestion from "./quizCreation/deleteQuestion";
import createTrueFalse from "./quizCreation/truefalse/createTrueFalse";
import updateTrueFalse from "./quizCreation/truefalse/updateTrueFalse";
import createMultipleChoice from "./quizCreation/multipleChoice/createMultipleChoice";
import updateMultipleChoice from "./quizCreation/multipleChoice/updateMultipleChoice";
import createWordOrdering from "./quizCreation/wordOrdering/createWordOrdering";
import updateWordOrdering from "./quizCreation/wordOrdering/updateWordOrdering";
import createMatchPairs from "./quizCreation/matchPairs/createMatchPairs";
import updateMatchPairs from "./quizCreation/matchPairs/updateMatchPairs";
import createFillInBlank from "./quizCreation/fillInBlank/createFillInBlank";
import updateFillInBlank from "./quizCreation/fillInBlank/updateFillInBlank";
import uploadFile from "./quizCreation/uploadFile";
import getUserCreatedDecks from "./userProfile/getUserCreatedDecks";
import updateUserProfile from "./userProfile/updateUserProfile";
import getUserProgress from "./userProfile/getUserProgress";

import usePostRequest from "./usePostRequest";
import postRequest from "./postRequest";
import useFetch from "./useFetch";
import fetchRequest from "./fetchRequest";

import getQuestion from "./getQuestion";
import startQuiz from "./startQuiz";
import evaluateAnswer from "./evaluateAnswer";
import getResults from "./getResults";

export {  getGrammars, getQuestionById, deleteQuestion, createFillInBlank, updateFillInBlank, createMatchPairs, updateMatchPairs, createWordOrdering, updateWordOrdering, addGrammar, createMultipleChoice, updateMultipleChoice, createTrueFalse, updateTrueFalse, getAllQuizzes, greetUser, getUserInfo, getQuizLevels, getQuizzesByLevel, getQuizzesByUser, createQuiz, getQuizById, updateQuiz, uploadFile, getUserCreatedDecks, updateUserProfile, getUserProgress, getQuestion, startQuiz, evaluateAnswer, getResults, usePostRequest, postRequest, fetchRequest, useFetch};
