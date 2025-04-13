// CreateLinkComponent.js
import React, {useEffect, useState} from 'react';
import {View, Text, TextInput, Button, Alert, StyleSheet} from 'react-native';
import {useMutation, gql} from '@apollo/client';
import {POST_MUTATION} from '../graphql/mutations/userMutation';
import {useDispatch, useSelector} from 'react-redux';
import {RootState, useAppDispatch} from '../redux/store';
import {postLink} from '../redux/slices/userSlice';

// GraphQL mutatioAppDispatchn for creating a new link

const CreateLinkComponent = () => {
  const [url, setUrl] = useState('');
  const [description, setDescription] = useState('');

  const dispatch = useAppDispatch();
  const {loading, post, error} = useSelector((state: RootState) => state?.post);

  // Use Apollo's useMutation hook to interact with the GraphQL server
  // const [postLink, { loading, error }] = useMutation(POST_MUTATION, {

  //   onCompleted: (data) => {
  //     console.log("data-->",data)

  //     Alert.alert('Success', `Link created with ID: ${data.post.id}`);
  //   },
  //   onError: (error) => {
  //     Alert.alert('Error', error.message);
  //   },
  // });
  useEffect(() => {
    if (post?.description && post?.id) {
      Alert.alert('Success', `Link created with ID: ${post?.id}`);
    }
  }, [post]);

  const handleCreateLink = () => {
    // postLink({
    //   variables: {
    //     url,
    //     description,
    //   },
    // });

    if (url && description) {
      // let obj = ;
      dispatch(postLink({url, description}));
    }
  };
  console.log('post in component', post);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Create New fsdfd Link</Text>

      <TextInput
        style={styles.input}
        placeholder="URL"
        value={url}
        onChangeText={setUrl}
      />
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
      />

      <Button
        title="Create Link"
        onPress={handleCreateLink}
        disabled={loading}
      />

      {error && <Text style={styles.error}>{error.message}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  heading: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 15,
    paddingLeft: 10,
  },
  error: {
    color: 'red',
    marginTop: 10,
  },
});

export default CreateLinkComponent;
