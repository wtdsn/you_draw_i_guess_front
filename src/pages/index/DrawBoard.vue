<script setup lang="ts">
import { onMounted, ref, onBeforeUnmount } from 'vue'
import { throttle, debounce } from 'utils-h'

export interface drawInfoInter {
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  tool: 'pen' | 'erase' | 'clear'
  color: string
}

interface propT {
  color: string,
  tool: 'pen' | 'erase',
  status: 'draw' | 'show',
  sendDrawInfo: (drawInfo: drawInfoInter) => void
}

const props = defineProps<propT>()

onMounted(() => {
	window.addEventListener('resize', setSize as any)
	window.addEventListener('mouseup', leave)
	init()
})
onBeforeUnmount(() => {
	window.removeEventListener('resize', setSize as any)
	window.removeEventListener('mouseup', leave)
})

// canvas 元素和 context 对象
const canvas = ref<HTMLCanvasElement>()
const ctx = ref<CanvasRenderingContext2D>()

// 初始化 canavs
function init() {
	ctx.value = canvas.value!.getContext('2d') as CanvasRenderingContext2D

	setSize()
}

// 设置宽高
const cw = ref(0), ch = ref(0), ox = ref(0), oy = ref(0)
const setSize = debounce(100, () => {
	const b = document.querySelector('.drawing_canvas_con') as HTMLDivElement
	const { width, height, x, y } = b.getBoundingClientRect()

	cw.value = width
	ch.value = height
	ox.value = x
	oy.value = y
  canvas.value!.width = cw.value
  canvas.value!.height = ch.value

  // 宽高修改后，一些样式需要重新设置
  ctx.value!.lineWidth = 2
}, false)

//  Path 类
class Path {
	constructor(public x1: number, public y1: number, public x2: number, public y2: number,
    public type: 'pen' | 'erase', public color: string,
	) { }
	draw() {
		const _ctx = ctx.value!

		// draw
		_ctx.beginPath()
		_ctx.moveTo(this.x1, this.y1)
		_ctx.lineTo(this.x2, this.y2)
		_ctx.lineWidth = this.type === 'erase' ? 10 : 2
		_ctx.strokeStyle = this.type === 'erase' ? '#fff' : this.color
		_ctx.closePath()
		_ctx.stroke()
	}
}

// 之前的点
const prePosi = ref<[number, number] | undefined>(undefined)
const startDraw = ref(false)
// 鼠标移动
const mousemove = throttle(20, (e: MouseEvent) => {
	if (!startDraw.value) return
	let { pageX, pageY } = e
	pageX -= ox.value
	pageY -= oy.value

	const data = {
		x1: prePosi.value![0],
		y1: prePosi.value![1],
		x2: pageX,
		y2: pageY,
		tool: props.tool,
		color: props.color
	}
	draw(data)

	props.sendDrawInfo(data)

	prePosi.value = [pageX, pageY]
}) as (e: MouseEvent) => void

function start(e: MouseEvent) {
	if (props.status === 'show') return
	startDraw.value = true
	let { pageX, pageY } = e
	pageX -= ox.value
	pageY -= oy.value
	prePosi.value = [pageX, pageY]
}

// 绘画
function draw(data: drawInfoInter) {
	if (data.tool === 'clear') {
		clear()
	} else {
		new Path(data.x1, data.y1, data.x2, data.y2, data.tool, data.color).draw()
	}
}

function leave() {
	startDraw.value = false
}

// 暴露 clear 方法
function clear() {
  ctx.value!.clearRect(0, 0, cw.value, ch.value)

}

defineExpose({
	clear,
	draw
})
</script>

<template>
  <div class="drawing_canvas_con">
    <canvas id="penPath" ref="canvas" @mousemove="mousemove" @mousedown="start"></canvas>
  </div>
</template>

<style scoped lang="less">
.drawing_canvas_con {
  width: 100%;
  height: 100%;
}

canvas {
  display: block;
}
</style>