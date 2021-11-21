import { isObject } from '@vue/shared'

const enum ReactiveFlags {
    IS_REACTIVE = '__v_isReactive'
}

const mutableHandles: ProxyHandler<object> = {
    get(target, key, recevier) {

        if(key === ReactiveFlags.IS_REACTIVE ){
            return true
        }

        const res = Reflect.get(target, key, recevier)
        return res;
    },
    set(target, key, value, recevier) {
        const res = Reflect.set(target, key, value, recevier)
        return res
    }
}


const reactiveMap = new WeakMap();// key 必须是对象，如果 key 没有被引用就会自动销毁


function createReactiveObject(target: object) {

    // 先默认这个target已经是代理过的属性
    if(target[ReactiveFlags.IS_REACTIVE]){
        return target
    }

    if (!isObject(target)) {
        return target
    }
    const exisitingProxy = reactiveMap.get(target)

    if (exisitingProxy) {
        return exisitingProxy
    }

    const proxy = new Proxy(target, mutableHandles)

    reactiveMap.set(target, proxy);

    return proxy
}

export function reactive(target: object) {
    return createReactiveObject(target)
}

export function readonly() {

}

export function shallowReactive() {

}
