// CreateLinkComponent.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { useMutation, gql } from '@apollo/client';

// GraphQL mutation for creating a new link
const POST_MUTATION = gql`
  mutation PostLink($url: String!, $description: String!) {
    post(url: $url, description: $description) {
      id
      description
      url
    }
  }
`;

const CreateLinkComponent = () => {
  const [url, setUrl] = useState('');
  const [description, setDescription] = useState('');

  // Use Apollo's useMutation hook to interact with the GraphQL server
  const [postLink, { loading, error }] = useMutation(POST_MUTATION, {
    onCompleted: (data) => {
      Alert.alert('Success', `Link created with ID: ${data.post.id}`);
    },
    onError: (error) => {
      Alert.alert('Error', error.message);
    },
  });

  const handleCreateLink = () => {
    postLink({
      variables: {
        url,
        description,
      },
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Create New Link</Text>
      
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
