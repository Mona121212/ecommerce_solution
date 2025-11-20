import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { CartIconProps } from '@/types'
import { Ionicons } from "@expo/vector-icons"
import { useRouter } from 'expo-router'
import { useCart } from "..context/cartContext";

const CartIcon = (props: CartIconProps = { color: "#333", size: 24 }) => {
    const router = useRouter();
    const { getItemCount } = useCart();
    const itemCount = getItemCount();
  return (
      <TouchableOpacity style={styles.container} onPress={() => router.push("/cart")} activeOpacity={0.7}>
          <Ionicons name='cart-outline' size={props.size} color={props.color} />
          {
              itemCount > 0 && (
                  <View style= {styles.badge}>
                      <Text style={styles.badgeText}>{itemCount > 99 ? "99+" : itemCount}</Text>
                  </View>
              )
          }
          <Text>CartIcon</Text>
    </TouchableOpacity>
      
    
  )
}

export default CartIcon

const styles = StyleSheet.create({
    container: {
        padding: 8,
        position: "relative",
    },
    badge: {
        position: 'absolute',
        top: 0,
        right: 0,
        backgroundColor: 'red',
        alignItems:'center'
    },
    badgeText: {

    }
})