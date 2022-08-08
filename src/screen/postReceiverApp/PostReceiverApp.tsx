import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {ThemeContext} from '../../../App';
import {getPosts, PostType} from '../../utils/apicalls';

const Stack = createStackNavigator();
function PostReceiverApp() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Home" component={HomePost} />
      <Stack.Screen name="Info" component={PostInfo} />
    </Stack.Navigator>
  );
}

function PostInfo(props: any) {
  return (
    <View>
      <Text>{JSON.stringify(props.route.params.info)}</Text>
    </View>
  );
}

function HomePost({navigation}) {
  const [page, setPage] = React.useState(0);
  const [posts, setPosts] = React.useState<any[]>([]);
  const styles = React.useContext(ThemeContext);
  async function fetchPosts() {
    const posts = await getPosts(page);
    if (posts !== null) {
      setPosts(prev => [...prev, ...posts]);
    }
    setPage(page + 1);
  }
  React.useEffect(() => {
    fetchPosts();
    let intervalId = setInterval(fetchPosts, 10000);
    return () => {
      clearInterval(intervalId);
    };
  }, []);
  return (
    <View style={[{flex: 1}, styles.marV]}>
      <FlatList
        data={posts}
        renderItem={props => (
          <Post
            {...props}
            handleDisplay={() =>
              navigation.navigate('Info', {
                info: props.item,
              })
            }
          />
        )}
        keyExtractor={(item, index) => index.toString()}
        onEndReached={fetchPosts}
      />
    </View>
  );
}

interface Props {
  item: PostType;
  handleDisplay: () => void;
}
function Post({item, handleDisplay}: Props) {
  const styles = React.useContext(ThemeContext);
  return (
    <View
      style={[
        {borderRadius: 10, backgroundColor: 'lightgray'},
        styles.pad,
        styles.mar,
      ]}>
      <TouchableOpacity onPress={handleDisplay}>
        <View>
          <Text style={styles.heading}>{item.title}</Text>
          <Text>{item.url}</Text>
          <Text>{new Date(item.created_at).toLocaleDateString()}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}
export default PostReceiverApp;
