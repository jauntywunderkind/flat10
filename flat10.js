"use module"
import RangeFilter from "async-iter-range-filter"

export function Walker( inputs, visit, start= 0, end= -1){
	// filter range
	if( start!== 0|| end!= -1){
		// resolve inputs in the chosen range
		inputs= RangeFilter( inputs, start, end)
	}

	// synchronization point
	if( inputs.then){
		return inputs.then( gather)
	}

	// unfurl one input
	async function visitInput( input){
		if( input[ Symbol.asyncIterator]){
			for await( const o of resolveInput[ Symbol.asyncIterator]()){
				visit( o)
			}
		}else if( input[ Symbol.iterator]){
			for( const o of resolveInput[ Symbol.syncIterator]()){
				visit( o)
			}
		}else if( o !== undefined){
			visit( o)
		}
	}
	return inputs.map( visitInput)
}

export function flat10( inputs, start= 0, end= -1){
	let accum= []
	const walk= Walker( inputs, o=> accum.push( o), start, end)
	return Promise.all( walk).then(()=> accum)
}
export default flat10

export function flat10All( ...inputs){
	return flat10( inputs)
}

