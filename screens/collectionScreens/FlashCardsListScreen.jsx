/**
 * File: FlashCardListScreen.jsx
 * Author: Kirill Kurakov <xkurak03>
 * Date Created: 12.11.2024
 * 
 */
import { Text, View, TouchableOpacity, TextInput } from 'react-native'
import React, { useEffect } from 'react'
import styles from './flashCardsListScreen.styles'
import { SafeAreaView } from 'react-native-safe-area-context'
import { FlashCardList } from '../../components'
import { useNavigation } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/Ionicons'
import { postRequest } from '../../api'
import { useState } from 'react'
import { Modal } from 'react-native'
import { useCallback } from 'react'
import config from '../../config/config'

const FlashCardsListScreen = ({route}) => {

  const {deckItem, isCreator, isLiked} = route.params;

  const navigation = useNavigation();

  const [deckName, setDeckName] = useState(deckItem.name); // Deck name to set it after the edit
  const [isEditing, setIsEditing] = useState(false); // Edit mode of the deckName on the screen
  const [showTooltip, setShowTooltip] = useState(false); // Tooltip to show that user can edit deck name

  const [sortByAttemps, setSortByAttemps] = useState(false); // Ability to sort flashcards based on attemps
  const [isAnswersHidden, setIsAnswersHidden] = useState(true); // Ability to hide answers
  const [loading, setLoading] = useState(false); // Loading state for the save button
  const [isModalVisible, setIsModalVisible] = useState(false); // Modal to show additional options
  const [likedNow, setLikedNow] = useState(isLiked); // Liked state of the deck

  const [tempDeckName, setTempDeckName] = useState(deckItem.name); 

  /**
   * @brief Function to toggle the modal
   * 
   * @returns {void}
   */
  const toggleModal = () => {
      setIsModalVisible(!isModalVisible);
  };

  /**
   * @brief Function to handle long press on the deck name
   * 
   * @returns {void}
   */
  const handleLongPress = () => {
    setIsEditing(true);
  }

  /**
   * @brief Function to handle save button press
   * 
   * @returns {void}
   */
  const handleSave = async () => {
    setLoading(true);
    // If name the same that was before, nothing to save
    if (tempDeckName === deckName) {
      setIsEditing(false);
      setLoading(false);
      setTempDeckName(deckName);
      return;
    }
    // Check if the deck name is not empty to save
    if (tempDeckName === '') {
      alert('Deck name cannot be empty');
      setIsEditing(false);
      setLoading(false);
      setTempDeckName(deckName);
      return;
    }
    
    // Check if the deck name is not too long
    if(tempDeckName.length > 20){
      alert('Deck name is too long');
      setIsEditing(false);
      setLoading(false);
      setTempDeckName(deckName);
      return;
    }
    // Send a POST request to the server to rename the deck
    try {
        let endpoint = `decks/${deckItem.ID}/rename`;
        let postData = {
            newName: tempDeckName,
        };

        let result = await postRequest(endpoint, postData);
        if (!result.success) {
            throw new Error('Failed to rename deck');
        }
        if(result.success){
          setDeckName(tempDeckName);
          setTempDeckName(tempDeckName);
        }
    } catch (error) {
      setTempDeckName(tempDeckName);
        console.error('ERROR' + error);
        alert('Failed to rename deck');
        setLoading(false);
        setIsEditing(false);
        return;
    } 
    setLoading(false);
    setIsEditing(false);
  }

  // Show tooltip for 2 seconds that user can edit deck name
  useEffect(() => {
    if (isCreator) {
        setShowTooltip(true);
        const timer = setTimeout(() => setShowTooltip(false), 2000); 
        return () => clearTimeout(timer);
    }
  }, []);
  /**
   * @brief Function to send a POST request to like the deck
   * 
   * @returns {void}
   */
  const onSubmitLike = useCallback(async () => {
    try {
        endpoint = `decks/${deckItem.ID}/like`;
        postData = {
            username: `${config.USERNAME}`,
        };
        const result = await postRequest(endpoint, postData);
        
        if (result && result.success) {
          console.log(result.success);
            setLikedNow(!likedNow);
        }
    } catch (error) {
        console.error(error);
    } 
});

/**
 * @brief Function to send a POST request to unlike the deck
 * 
 * @returns {void}
 * 
 * @throws {error} If the request fails
 */
const onSubmitUnLike = useCallback(async () => {
    try {
      endpoint = `decks/${deckItem.ID}/unlike`;
      postData = {
          username: `${config.USERNAME}`,
      };
        const result = await postRequest(endpoint, postData);
        
        if (result && result.success) {
          console.log(result.success);
            setLikedNow(!likedNow);
        }
    } catch (error) {
        console.error(error);
    } 
} );


return (
    <SafeAreaView styles={styles.mainContainer}>
      {/* Top Bar with deck name and buttons to like, edit and add new flashcards */}
        <View style ={styles.topBarContainer}>
          <View style={styles.topBarElem}>
            <TouchableOpacity onPress={()=>navigation.goBack()} >
              <Icon name="arrow-back-outline" size={38} color="black" />
            </TouchableOpacity>
          </View>
            
            {/* Only for the creator of the deck, he can edit the deck name */}
            <View style={styles.topBarElem}>
              {isEditing && isCreator ? (
                // Form for editing the deck name
                  <View style={styles.editContainer}>
                      <TextInput
                          value={tempDeckName}
                          onChangeText={setTempDeckName}
                          style={styles.textInput}
                          editable={!loading} 
                      />
                      <TouchableOpacity onPress={handleSave} disabled={loading} style={styles.saveButton}>
                          <Text style={styles.saveButtonText}>Save</Text>
                      </TouchableOpacity>
                  </View>
              ) : (
                    
                  <TouchableOpacity style={styles.titleContainer} onLongPress={handleLongPress}>
                      {showTooltip && (
                      <Text style={styles.tooltip}>Long tap to edit name</Text>
                  )}
                      <Text style={styles.textStyle}>{deckName}</Text>
                  </TouchableOpacity>

              )}

            </View>
            
            <View style={[styles.topBarMenuWrapper, styles.topBarElem]}>
                <View>
                  <TouchableOpacity onPress={toggleModal}>
                  <Icon name="cog-outline" size={38} color="black" />
                </TouchableOpacity>
              <Modal
              transparent={true}
              visible={isModalVisible}
              animationType="fade"
              onRequestClose={toggleModal}>
                <TouchableOpacity
                    style={styles.overlay}
                    activeOpacity={1}
                    onPress={toggleModal}>
                      {/* Pop up menu to sort flashcards and hide answers */}
                    <View style={styles.popUpContainer}>
                        <Text style={styles.popUpText} onPress={() => {
                            setSortByAttemps(!sortByAttemps);
                            toggleModal(); 
                        }}>
                          Sort by attempts {sortByAttemps ? '✓' : '  '}
                        </Text>
                        <Text style={styles.popUpText} onPress={() => {
                            setIsAnswersHidden(!isAnswersHidden);
                            toggleModal(); 
                        }}>
                          Hide answers {isAnswersHidden ? '✓' : '  '}
                        </Text>
                    </View>
                </TouchableOpacity>
            </Modal> 
           </View>
            {/* Only for the creator, he can create new flashcards in the current collection */}
              {isCreator ? (
                <TouchableOpacity onPress={()=>navigation.navigate("NewFlashCardFormScreen", { deckId: deckItem.ID, isCreator: isCreator })}>
                <Icon name="add-outline" size={38} color="black" />
                </TouchableOpacity>
              ) : (
                <View>
                    {/* Like collection button */}
                    {likedNow ? (
                    <TouchableOpacity onPress={onSubmitUnLike}>
                    <Icon name="heart" size={38} color="black" />
                    </TouchableOpacity>
                    ) : (
                    <TouchableOpacity onPress={onSubmitLike}>
                    <Icon name="heart-outline" size={38} color="black" />
                    </TouchableOpacity>
                  )}
                </View>
                
                )}
            </View>
              
            
        </View>
          <FlashCardList deckId = {[deckItem.ID]} isCreator={isCreator} sortByAttemps={sortByAttemps} isAnswersHidden={isAnswersHidden}/>
    </SafeAreaView>
  )
}

export default FlashCardsListScreen
