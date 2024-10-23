import { StyleSheet, Text, View } from 'react-native';
import { Link } from 'expo-router';

export default function Page() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Home page</Text>

      <Link style={styles.link} href="/">
        Go to home page
      </Link>

      <Link style={styles.link} href="/cool">
        Go to cool page
      </Link>

      {/* This should have a type error */}
      <Link style={styles.link} href="intentional/type/error">
        Go to intentional/type/error
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 40,
  },
  link: {
    color: '#007BFF',
    marginTop: 20,
  },
});
