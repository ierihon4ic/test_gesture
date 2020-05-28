import React, {useRef} from 'react';
import {Animated, StyleSheet, View, PanResponder, Image, Dimensions} from 'react-native'
import type {PanResponderInstance} from "react-native/Libraries/Interaction/PanResponder";


class MovedImage extends React.Component {


    point = new Animated.ValueXY(0, 0)
    zoom = new Animated.Value(1)
    currentZoom = 1
    startRange = 1

    constructor(props) {
        super(props);
        this.onMove = this.onMove.bind(this)
        this.onGrant = this.onGrant.bind(this)
        this.onRelease = this.onRelease.bind(this)
        this.uri = "https://i.pinimg.com/originals/ce/ac/40/ceac40f9fb25ae2aa8efc0f45971731d.jpg"
        this.Action = 1

    }

    onGrant(evt) {

        if (evt.nativeEvent.touches.length === 1) {
            this.Action = 0
        }

        this.point.setOffset({
            x: this.point.x._value - evt.nativeEvent.pageX,
            y: this.point.y._value - evt.nativeEvent.pageY
        });
        if (evt.nativeEvent.touches.length === 2) {
            this.Action = 1
            const x1 = {x:evt.nativeEvent.touches[0].locationX, y:evt.nativeEvent.touches[0].locationY}
            const x2 = {x:evt.nativeEvent.touches[1].locationX, y:evt.nativeEvent.touches[1].locationY}
                this.startRange = Math.sqrt((x1.x-x2.x) **2 + (x1.y-x2.y) ** 2)

            this.zoom.setValue(this.currentZoom)

            console.log({zoom:this.zoom})
            console.log({currentZoom:this.currentZoom})
        }
        this.forceUpdate()

    }

    onMove(evt) {

        if (evt.nativeEvent.touches.length === 2) {

            const x1 = {x:evt.nativeEvent.touches[0].locationX, y:evt.nativeEvent.touches[0].locationY}
            const x2 = {x:evt.nativeEvent.touches[1].locationX, y:evt.nativeEvent.touches[1].locationY}
            const movedRange = Math.sqrt((x1.x-x2.x) **2 + (x1.y-x2.y) ** 2)



            Animated.event([
                    {scale: this.zoom}
                ], {useNativeDriver: false}
            )({scale:movedRange/this.startRange})
        }
        if (evt.nativeEvent.touches.length === 1) {
            Animated.event([
                    {dx: this.point.x, dy: this.point.y,}
                ], {useNativeDriver: false}
            )({dx: evt.nativeEvent.pageX, dy: evt.nativeEvent.pageY})
        }

    }

    onRelease(evt) {
        this.point.flattenOffset();
        //this.zoom.flattenOffset();
        this.currentZoom = this.zoom._value;

    }

    render() {
        const A = this.Action
        console.log(A)
        return (

            <Animated.Image
                style={[styles.box, {
                    //transform: [],
                },
                    (this.Action)?
                    {transform: [{scale: this.zoom}]} :
                    {transform: [{translateX: this.point.x}, {translateY: this.point.y}]},

                ]}
                onMoveShouldSetResponder={() => true}
                onResponderGrant={this.onGrant}
                onResponderMove={this.onMove}
                onResponderRelease={this.onRelease}
                source={{uri: this.uri}}
            />

        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    box: {
        height: "100%",
        width: "100%",
        borderRadius: 20,
        resizeMode: 'contain',
    },

});

export default MovedImage;
