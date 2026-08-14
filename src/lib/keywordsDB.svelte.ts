export function GetKeywords() {
  return {
    js: `
      async await break case catch class const continue debugger default delete do else
      enum export extends false finally for function if import in instanceof new null
      return super switch this throw true try typeof var void while with yield let static
      get set constructor

      undefined NaN Infinity

      Array Object String Number Boolean BigInt Symbol Function RegExp Date Error
      EvalError RangeError ReferenceError SyntaxError TypeError URIError AggregateError
      Map Set WeakMap WeakSet Promise Proxy Reflect

      ArrayBuffer SharedArrayBuffer Atomics DataView
      Uint8Array Uint8ClampedArray Uint16Array Uint32Array
      Int8Array Int16Array Int32Array Float32Array Float64Array
      BigInt64Array BigUint64Array

      JSON Math Intl WebAssembly

      console log warn error info debug trace table dir dirxml
      assert count countReset clear time timeEnd timeLog
      group groupEnd groupCollapsed profile profileEnd

      parseInt parseFloat isNaN isFinite isInteger isSafeInteger
      encodeURI encodeURIComponent decodeURI decodeURIComponent
      eval isFinite isNaN

      from fromCodePoint fromCharCode raw
      charAt charCodeAt codePointAt
      concat endsWith startsWith includes indexOf lastIndexOf
      slice substring substr split
      replace replaceAll match matchAll search
      trim trimStart trimEnd
      padStart padEnd repeat normalize
      localeCompare
      toString valueOf

      push pop shift unshift
      join reverse sort splice slice concat
      fill copyWithin flat flatMap
      map filter reduce reduceRight
      forEach every some find findIndex
      findLast findLastIndex
      includes indexOf
      entries keys values

      assign create defineProperty defineProperties
      freeze seal preventExtensions
      getPrototypeOf setPrototypeOf
      getOwnPropertyDescriptor getOwnPropertyDescriptors
      getOwnPropertyNames getOwnPropertySymbols
      hasOwnProperty isPrototypeOf propertyIsEnumerable

      floor ceil round trunc abs max min random
      pow sqrt cbrt sign
      sin cos tan asin acos atan atan2
      sinh cosh tanh asinh acosh atanh
      log log10 log2 exp expm1
      hypot clz32 imul fround

      resolve reject all allSettled race any
      then catch finally
      allSettled

      document window globalThis
      navigator location history screen
      localStorage sessionStorage indexedDB
      alert confirm prompt
      open close print focus blur

      fetch XMLHttpRequest WebSocket Event EventTarget CustomEvent
      FormData Headers Request Response URL URLSearchParams
      Blob File FileReader FileList
      AbortController AbortSignal

      setTimeout clearTimeout
      setInterval clearInterval
      requestAnimationFrame cancelAnimationFrame
      requestIdleCallback cancelIdleCallback

      addEventListener removeEventListener dispatchEvent
      querySelector querySelectorAll
      getElementById getElementsByClassName getElementsByTagName
      createElement createTextNode createDocumentFragment
      append appendChild prepend
      insertBefore remove removeChild replaceChild
      cloneNode contains
      getAttribute setAttribute removeAttribute hasAttribute
      classList className id style dataset
      innerHTML outerHTML textContent innerText
      value checked selected disabled hidden
      preventDefault stopPropagation stopImmediatePropagation
    `.split(/\s+/),

    ts: `
  abstract any as asserts async await bigint boolean break case catch class const
  constructor continue debugger declare default delete do else enum export extends
  false finally for from function get if implements import in infer instanceof
  interface is keyof let module namespace never new null number object
  of omit override package private protected public readonly require
  return satisfies set static string super switch symbol this throw true
  try type typeof undefined unique unknown var void while with yield

  declare
  global
  namespace
  module

  type
  interface
  enum
  class
  function
  constructor
  readonly
  abstract
  public
  private
  protected
  static
  override
  implements
  extends
  super

  as
  satisfies
  keyof
  typeof
  infer
  is
  asserts
  in
  instanceof

  any
  unknown
  never
  void
  undefined
  null
  object
  string
  number
  bigint
  boolean
  symbol

  true
  false

  Array
  ReadonlyArray
  ArrayLike
  Iterable
  IterableIterator
  Iterator
  AsyncIterable
  AsyncIterableIterator
  AsyncIterator

  String
  Number
  Boolean
  Object
  Function
  Symbol
  BigInt
  RegExp
  Date
  Error
  EvalError
  RangeError
  ReferenceError
  SyntaxError
  TypeError
  URIError
  AggregateError

  Map
  ReadonlyMap
  WeakMap
  Set
  ReadonlySet
  WeakSet

  Promise
  PromiseLike
  AsyncFunction
  Generator
  GeneratorFunction
  AsyncGenerator
  AsyncGeneratorFunction

  ArrayBuffer
  SharedArrayBuffer
  DataView
  Uint8Array
  Uint8ClampedArray
  Uint16Array
  Uint32Array
  BigUint64Array
  Int8Array
  Int16Array
  Int32Array
  BigInt64Array
  Float32Array
  Float64Array
  SharedArrayBuffer
  Atomics

  JSON
  Math
  Reflect
  Proxy
  Intl
  WebAssembly

  NaN
  Infinity

  Record
  Partial
  Required
  Readonly
  ReadonlyArray
  Pick
  Omit
  Exclude
  Extract
  NonNullable
  ReturnType
  InstanceType
  Parameters
  ConstructorParameters
  ThisParameterType
  OmitThisParameter
  ThisType
  Awaited

  Uppercase
  Lowercase
  Capitalize
  Uncapitalize

  NoInfer

  WeakKey
  WeakKeyTypes

  PropertyKey
  Primitive

  CallableFunction
  NewableFunction

  IArguments
  Arguments

  FunctionPropertyNames
  FunctionProperties
  NonFunctionPropertyNames
  NonFunctionProperties

  RequiredKeys
  OptionalKeys

  Awaited
  PromiseConstructor
  PromiseLike
  PromiseSettledResult
  PromiseFulfilledResult
  PromiseRejectedResult

  Partial
  Required
  Readonly
  Pick
  Record
  Exclude
  Extract
  Omit
  NonNullable

  ReturnType
  InstanceType
  Parameters
  ConstructorParameters
  ThisParameterType
  OmitThisParameter
  ThisType

  Uppercase
  Lowercase
  Capitalize
  Uncapitalize

  ArrayConstructor
  ArrayBufferConstructor
  BooleanConstructor
  DateConstructor
  ErrorConstructor
  EvalErrorConstructor
  FunctionConstructor
  MapConstructor
  NumberConstructor
  ObjectConstructor
  PromiseConstructor
  ProxyConstructor
  RangeErrorConstructor
  ReferenceErrorConstructor
  RegExpConstructor
  SetConstructor
  StringConstructor
  SymbolConstructor
  SyntaxErrorConstructor
  TypeErrorConstructor
  URIErrorConstructor
  WeakMapConstructor
  WeakSetConstructor
  BigIntConstructor

  console
  log
  info
  debug
  warn
  error
  trace
  table
  dir
  dirxml
  group
  groupCollapsed
  groupEnd
  time
  timeEnd
  timeLog
  count
  countReset
  assert
  clear
  profile
  profileEnd

  JSON.parse
  JSON.stringify

  Math.E
  Math.LN10
  Math.LN2
  Math.LOG10E
  Math.LOG2E
  Math.PI
  Math.SQRT1_2
  Math.SQRT2
  Math.abs
  Math.acos
  Math.acosh
  Math.asin
  Math.asinh
  Math.atan
  Math.atanh
  Math.atan2
  Math.cbrt
  Math.ceil
  Math.clz32
  Math.cos
  Math.cosh
  Math.exp
  Math.expm1
  Math.floor
  Math.fround
  Math.hypot
  Math.imul
  Math.log
  Math.log1p
  Math.log2
  Math.log10
  Math.max
  Math.min
  Math.pow
  Math.random
  Math.round
  Math.sign
  Math.sin
  Math.sinh
  Math.sqrt
  Math.tan
  Math.tanh
  Math.trunc

  Number.EPSILON
  Number.MAX_SAFE_INTEGER
  Number.MIN_SAFE_INTEGER
  Number.MAX_VALUE
  Number.MIN_VALUE
  Number.NaN
  Number.NEGATIVE_INFINITY
  Number.POSITIVE_INFINITY
  Number.isFinite
  Number.isInteger
  Number.isNaN
  Number.isSafeInteger
  Number.parseFloat
  Number.parseInt

  String.fromCharCode
  String.fromCodePoint
  String.raw

  Boolean

  Object.assign
  Object.create
  Object.defineProperties
  Object.defineProperty
  Object.entries
  Object.freeze
  Object.fromEntries
  Object.getOwnPropertyDescriptor
  Object.getOwnPropertyDescriptors
  Object.getOwnPropertyNames
  Object.getOwnPropertySymbols
  Object.getPrototypeOf
  Object.hasOwn
  Object.is
  Object.isExtensible
  Object.isFrozen
  Object.isSealed
  Object.keys
  Object.preventExtensions
  Object.seal
  Object.setPrototypeOf
  Object.values

  Array.from
  Array.isArray
  Array.of

  Array.prototype
  push
  pop
  shift
  unshift
  concat
  copyWithin
  fill
  find
  findIndex
  findLast
  findLastIndex
  lastIndexOf
  indexOf
  includes
  join
  keys
  entries
  values
  forEach
  filter
  flat
  flatMap
  map
  every
  some
  reduce
  reduceRight
  reverse
  sort
  slice
  splice
  toReversed
  toSorted
  toSpliced
  with

  String.prototype
  charAt
  charCodeAt
  codePointAt
  concat
  endsWith
  startsWith
  includes
  indexOf
  lastIndexOf
  localeCompare
  match
  matchAll
  normalize
  padEnd
  padStart
  repeat
  replace
  replaceAll
  search
  slice
  split
  substring
  substr
  toLowerCase
  toUpperCase
  toLocaleLowerCase
  toLocaleUpperCase
  trim
  trimStart
  trimEnd
  valueOf

  Map.prototype
  set
  get
  has
  delete
  clear
  entries
  keys
  values
  forEach
  size

  Set.prototype
  add
  has
  delete
  clear
  entries
  keys
  values
  forEach
  size
  union
  intersection
  difference
  symmetricDifference
  isSubsetOf
  isSupersetOf
  isDisjointFrom

  WeakMap.prototype
  WeakSet.prototype
  has
  get
  set
  add
  delete

  Promise.resolve
  Promise.reject
  Promise.all
  Promise.allSettled
  Promise.race
  Promise.any
  Promise.withResolvers
  then
  catch
  finally

  Date.now
  Date.parse
  Date.UTC

  RegExp
  exec
  test
  flags
  global
  ignoreCase
  multiline
  source
  sticky
  unicode
  dotAll

  Symbol.iterator
  Symbol.asyncIterator
  Symbol.hasInstance
  Symbol.isConcatSpreadable
  Symbol.match
  Symbol.matchAll
  Symbol.replace
  Symbol.search
  Symbol.species
  Symbol.split
  Symbol.toPrimitive
  Symbol.toStringTag
  Symbol.unscopables
  Symbol.for
  Symbol.keyFor

  Reflect.apply
  Reflect.construct
  Reflect.defineProperty
  Reflect.deleteProperty
  Reflect.get
  Reflect.getOwnPropertyDescriptor
  Reflect.getPrototypeOf
  Reflect.has
  Reflect.isExtensible
  Reflect.ownKeys
  Reflect.preventExtensions
  Reflect.set
  Reflect.setPrototypeOf

  Intl.Collator
  Intl.DateTimeFormat
  Intl.DisplayNames
  Intl.ListFormat
  Intl.Locale
  Intl.NumberFormat
  Intl.PluralRules
  Intl.RelativeTimeFormat
  Intl.Segmenter

  WebAssembly.Module
  WebAssembly.Instance
  WebAssembly.Memory
  WebAssembly.Table
  WebAssembly.Global
  WebAssembly.CompileError
  WebAssembly.LinkError
  WebAssembly.RuntimeError

  Error.captureStackTrace
  Error.stackTraceLimit
  Error.cause

  decodeURI
  decodeURIComponent
  encodeURI
  encodeURIComponent
  escape
  unescape
  eval
  isFinite
  isNaN
  parseFloat
  parseInt

  setTimeout
  clearTimeout
  setInterval
  clearInterval
  setImmediate
  clearImmediate
  queueMicrotask
  requestAnimationFrame
  cancelAnimationFrame
  requestIdleCallback
  cancelIdleCallback

  globalThis
  global
  process
  Buffer
  require
  module
  exports
  __dirname
  __filename

  document
  window
  navigator
  location
  history
  screen
  frames
  self
  top
  parent
  opener
  origin
  localStorage
  sessionStorage
  indexedDB
  caches
  crypto
  performance
  customElements

  alert
  confirm
  prompt
  print
  open
  close
  focus
  blur

  Event
  EventTarget
  CustomEvent
  UIEvent
  MouseEvent
  PointerEvent
  KeyboardEvent
  WheelEvent
  TouchEvent
  InputEvent
  FocusEvent
  DragEvent
  ClipboardEvent
  CompositionEvent
  ProgressEvent
  ErrorEvent
  HashChangeEvent
  PopStateEvent
  StorageEvent
  MessageEvent
  PageTransitionEvent
  BeforeUnloadEvent
  SubmitEvent

  addEventListener
  removeEventListener
  dispatchEvent

  preventDefault
  stopPropagation
  stopImmediatePropagation

  EventTarget.addEventListener
  EventTarget.removeEventListener
  EventTarget.dispatchEvent

  querySelector
  querySelectorAll
  getElementById
  getElementsByClassName
  getElementsByTagName
  getElementsByName
  createElement
  createTextNode
  createDocumentFragment
  createComment
  createEvent
  append
  appendChild
  prepend
  insertBefore
  remove
  removeChild
  replaceChild
  cloneNode
  contains
  compareDocumentPosition

  getAttribute
  setAttribute
  hasAttribute
  removeAttribute
  toggleAttribute
  getAttributeNames

  classList
  className
  id
  style
  dataset
  innerHTML
  outerHTML
  textContent
  innerText
  children
  childNodes
  firstChild
  lastChild
  parentNode
  parentElement
  nextSibling
  previousSibling
  firstElementChild
  lastElementChild
  nextElementSibling
  previousElementSibling

  value
  checked
  selected
  disabled
  readonly
  hidden
  required
  multiple
  placeholder
  name
  type
  src
  href
  target
  rel
  alt
  title
  width
  height

  fetch
  XMLHttpRequest
  WebSocket
  EventSource

  Headers
  Request
  Response
  URL
  URLSearchParams
  FormData
  Blob
  File
  FileList
  FileReader
  FileReaderSync
  ArrayBuffer
  FormDataEvent
  AbortController
  AbortSignal

  fetch
  Request
  Response
  Headers
  body
  bodyUsed
  json
  text
  blob
  arrayBuffer
  formData
  clone

  WebSocket
  WebSocket.CONNECTING
  WebSocket.OPEN
  WebSocket.CLOSING
  WebSocket.CLOSED
  onopen
  onmessage
  onerror
  onclose
  send
  close

  URL.createObjectURL
  URL.revokeObjectURL
  URL.canParse
  URL.parse

  URLSearchParams.append
  URLSearchParams.delete
  URLSearchParams.get
  URLSearchParams.getAll
  URLSearchParams.has
  URLSearchParams.set
  URLSearchParams.sort
  URLSearchParams.entries
  URLSearchParams.keys
  URLSearchParams.values
  URLSearchParams.toString

  File
  FileReader.readAsText
  FileReader.readAsDataURL
  FileReader.readAsArrayBuffer
  FileReader.readAsBinaryString

  Blob.arrayBuffer
  Blob.bytes
  Blob.slice
  Blob.stream
  Blob.text

  AbortController.abort
  AbortController.signal

  navigator.userAgent
  navigator.language
  navigator.languages
  navigator.platform
  navigator.onLine
  navigator.hardwareConcurrency
  navigator.maxTouchPoints
  navigator.cookieEnabled
  navigator.geolocation
  navigator.clipboard
  navigator.mediaDevices
  navigator.serviceWorker

  history.back
  history.forward
  history.go
  history.pushState
  history.replaceState

  location.href
  location.origin
  location.protocol
  location.host
  location.hostname
  location.port
  location.pathname
  location.search
  location.hash
  location.assign
  location.replace
  location.reload

  localStorage.getItem
  localStorage.setItem
  localStorage.removeItem
  localStorage.clear
  localStorage.key
  localStorage.length

  sessionStorage.getItem
  sessionStorage.setItem
  sessionStorage.removeItem
  sessionStorage.clear
  sessionStorage.key
  sessionStorage.length

  CSS
  CSS.escape
  CSS.supports
  CSSStyleSheet
  CSSRule
  CSSStyleRule
  CSSMediaRule
  CSSSupportsRule

  MutationObserver
  ResizeObserver
  IntersectionObserver
  PerformanceObserver
  ReportingObserver

  getComputedStyle
  matchMedia
  requestIdleCallback
  requestAnimationFrame

  Element
  HTMLElement
  HTMLDivElement
  HTMLSpanElement
  HTMLInputElement
  HTMLButtonElement
  HTMLFormElement
  HTMLTextAreaElement
  HTMLSelectElement
  HTMLImageElement
  HTMLVideoElement
  HTMLAudioElement
  HTMLCanvasElement
  HTMLAnchorElement

  Node
  NodeList
  HTMLCollection
  DOMTokenList
  DOMStringMap

  CanvasRenderingContext2D
  WebGLRenderingContext
  WebGL2RenderingContext

  Audio
  AudioContext
  AudioBuffer
  AudioBufferSourceNode
  GainNode
  OscillatorNode
  AnalyserNode

  MediaSource
  SourceBuffer
  MediaRecorder
  MediaStream
  MediaStreamTrack

  serviceWorker
  ServiceWorker
  ServiceWorkerRegistration
  ServiceWorkerContainer
  Cache
  CacheStorage

  IndexedDB
  IDBDatabase
  IDBObjectStore
  IDBIndex
  IDBTransaction
  IDBRequest
  IDBKeyRange
  indexedDB.open
  indexedDB.deleteDatabase

  crypto.getRandomValues
  crypto.randomUUID
  crypto.subtle
  subtle.digest
  subtle.generateKey
  subtle.importKey
  subtle.exportKey
  subtle.encrypt
  subtle.decrypt
  subtle.sign
  subtle.verify
  subtle.deriveKey
  subtle.deriveBits
  CryptoKey

  performance.now
  performance.mark
  performance.measure
  performance.getEntries
  performance.getEntriesByName
  performance.getEntriesByType
  performance.clearMarks
  performance.clearMeasures
  PerformanceEntry
  PerformanceMark
  PerformanceMeasure
  PerformanceNavigationTiming
  PerformanceResourceTiming

  Node.ELEMENT_NODE
  Node.ATTRIBUTE_NODE
  Node.TEXT_NODE
  Node.CDATA_SECTION_NODE
  Node.PROCESSING_INSTRUCTION_NODE
  Node.COMMENT_NODE
  Node.DOCUMENT_NODE
  Node.DOCUMENT_TYPE_NODE
  Node.DOCUMENT_FRAGMENT_NODE

  DOMParser
  XMLSerializer
  FormData
  DataTransfer
  Clipboard
  ClipboardItem

  Worker
  SharedWorker
  MessageChannel
  MessagePort
  BroadcastChannel
  postMessage
  onmessage
  onmessageerror

  ReadableStream
  WritableStream
  TransformStream
  ByteLengthQueuingStrategy
  CountQueuingStrategy
  TextEncoder
  TextDecoder

  ReadableStreamDefaultReader
  ReadableStreamBYOBReader
  ReadableStreamDefaultController
  ReadableByteStreamController
  WritableStreamDefaultWriter
  WritableStreamDefaultController
  TransformStreamDefaultController

  CompressionStream
  DecompressionStream

  structuredClone

  queueMicrotask

  AggregateError
  DOMException

  import
  export
  default
  from
  as

  import.meta
  import.meta.url
  import.meta.resolve

  PromiseRejectionEvent
  unhandledrejection
  rejectionhandled

  TypeError
  RangeError
  ReferenceError
  SyntaxError
  URIError
  EvalError
  AggregateError

  SharedArrayBuffer
  Atomics.add
  Atomics.and
  Atomics.compareExchange
  Atomics.exchange
  Atomics.isLockFree
  Atomics.load
  Atomics.notify
  Atomics.or
  Atomics.store
  Atomics.sub
  Atomics.wait
  Atomics.waitAsync
  Atomics.xor

  FinalizationRegistry
  WeakRef

  Disposable
  AsyncDisposable
  Symbol.dispose
  Symbol.asyncDispose

  using
  await using

  Temporal
  Temporal.Now
  Temporal.Instant
  Temporal.PlainDate
  Temporal.PlainTime
  Temporal.PlainDateTime
  Temporal.PlainYearMonth
  Temporal.PlainMonthDay
  Temporal.ZonedDateTime
  Temporal.Duration
  Temporal.Calendar
  Temporal.TimeZone

  node
  fs
  fs/promises
  path
  url
  util
  events
  stream
  buffer
  http
  https
  net
  tls
  os
  crypto
  child_process
  worker_threads
  readline
  readline/promises
  zlib
  assert
  assert/strict
  querystring
  string_decoder
  timers
  timers/promises
  tty
  dgram
  dns
  dns/promises
  cluster
  vm
  perf_hooks
  async_hooks
  diagnostics_channel
  inspector
  module
  process
  punycode
  v8
  trace_events
  test

  fs.readFile
  fs.readFileSync
  fs.writeFile
  fs.writeFileSync
  fs.appendFile
  fs.appendFileSync
  fs.mkdir
  fs.mkdirSync
  fs.readdir
  fs.readdirSync
  fs.rm
  fs.rmSync
  fs.rmdir
  fs.rmdirSync
  fs.unlink
  fs.unlinkSync
  fs.rename
  fs.renameSync
  fs.copyFile
  fs.copyFileSync
  fs.stat
  fs.statSync
  fs.lstat
  fs.lstatSync
  fs.existsSync
  fs.watch
  fs.watchFile
  fs.createReadStream
  fs.createWriteStream
  fs.open
  fs.openSync
  fs.close
  fs.closeSync
  fs.chmod
  fs.chown
  fs.realpath
  fs.access
  fs.constants

  path.join
  path.resolve
  path.relative
  path.dirname
  path.basename
  path.extname
  path.parse
  path.format
  path.normalize
  path.isAbsolute
  path.sep
  path.delimiter
  path.posix
  path.win32

  os.platform
  os.arch
  os.cpus
  os.totalmem
  os.freemem
  os.homedir
  os.tmpdir
  os.hostname
  os.userInfo
  os.networkInterfaces
  os.release
  os.type
  os.version
  os.EOL

  process.argv
  process.env
  process.cwd
  process.chdir
  process.exit
  process.exitCode
  process.nextTick
  process.pid
  process.ppid
  process.platform
  process.arch
  process.version
  process.versions
  process.memoryUsage
  process.cpuUsage
  process.uptime
  process.hrtime
  process.title
  process.stdin
  process.stdout
  process.stderr

  Buffer.alloc
  Buffer.allocUnsafe
  Buffer.from
  Buffer.concat
  Buffer.compare
  Buffer.isBuffer
  Buffer.byteLength
  Buffer.poolSize
  toString
  write
  slice
  subarray
  copy
  fill
  equals
  includes
  indexOf
  lastIndexOf

  EventEmitter
  on
  once
  off
  emit
  addListener
  removeListener
  removeAllListeners
  listeners
  rawListeners
  listenerCount
  eventNames
  setMaxListeners
  getMaxListeners

  http.createServer
  http.request
  http.get
  https.createServer
  https.request
  https.get
  IncomingMessage
  ServerResponse

  stream.Readable
  stream.Writable
  stream.Duplex
  stream.Transform
  stream.PassThrough
  readable
  writable
  pipe
  unpipe
  pause
  resume
  destroy
  end
  write

  util.inspect
  util.format
  util.promisify
  util.callbackify
  util.types

  child_process.exec
  child_process.execFile
  child_process.execSync
  child_process.execFileSync
  child_process.spawn
  child_process.spawnSync
  child_process.fork

  crypto.createHash
  crypto.createHmac
  crypto.createCipheriv
  crypto.createDecipheriv
  crypto.createSign
  crypto.createVerify
  crypto.randomBytes
  crypto.randomUUID
  crypto.scrypt
  crypto.pbkdf2

  readline.createInterface
  readline.question
  readline/promises

  assert.equal
  assert.notEqual
  assert.strictEqual
  assert.notStrictEqual
  assert.deepEqual
  assert.deepStrictEqual
  assert.notDeepEqual
  assert.ok
  assert.fail
  assert.throws
  assert.doesNotThrow
  assert.rejects
  assert.doesNotReject

  require.resolve
  require.cache
  require.main

  module.exports
  module.require
  module.filename
  module.id
  module.parent
  module.children
  module.loaded
  module.paths

  npm
  npx
  node
  nodejs
  bun
  deno

  React
  ReactDOM
  JSX
  Fragment
  createElement
  useState
  useEffect
  useContext
  useReducer
  useMemo
  useCallback
  useRef
  useImperativeHandle
  useLayoutEffect
  useInsertionEffect
  useId
  useTransition
  useDeferredValue
  useSyncExternalStore
  useDebugValue

  Svelte
  onMount
  onDestroy
  beforeUpdate
  afterUpdate
  tick
  derived
  writable
  readable
  get

  Vue
  ref
  reactive
  computed
  watch
  watchEffect
  nextTick
  onMounted
  onUnmounted
  onUpdated
  defineComponent
  defineProps
  defineEmits
  defineExpose
  defineOptions
  defineModel
  provide
  inject

  Angular
  Component
  Injectable
  NgModule
  Input
  Output
  EventEmitter
  Signal
  computed
  effect
  inject

  lodash
  axios
  express
  vite
  webpack
  eslint
  prettier
  jest
  vitest
  mocha
  chai
`.split(/\s+/),

    rs: `
  as async await break const continue crate dyn else enum extern false fn
  for if impl in let loop match mod move mut pub ref return self Self
  static struct super trait true type unsafe use where while

  abstract become box do final macro override priv typeof unsized virtual
  yield try gen

  i8 i16 i32 i64 i128 isize
  u8 u16 u32 u64 u128 usize
  f32 f64 bool char str String

  Option Result Some None Ok Err
  Box Rc Arc Weak
  Cell RefCell OnceCell LazyCell OnceLock LazyLock
  Mutex RwLock Condvar Barrier Once
  Cow

  Vec VecDeque LinkedList
  HashMap HashSet BTreeMap BTreeSet BinaryHeap
  String

  Send Sync Sized Unpin
  Clone Copy Default Debug Display
  PartialEq Eq PartialOrd Ord Hash
  Iterator IntoIterator From Into TryFrom TryInto
  AsRef AsMut Borrow BorrowMut
  Deref DerefMut Drop
  Fn FnMut FnOnce
  Error ToOwned ToString
  Sized Unsize

  println! print! eprintln! eprint!
  panic! format! format_args! vec!
  assert! assert_eq! assert_ne!
  debug_assert! debug_assert_eq! debug_assert_ne!
  todo! unimplemented! unreachable!
  write! writeln! dbg!

  env! option_env! cfg!
  include! include_bytes! include_str!
  concat! concat_idents! stringify!
  line! column! file! module_path!
  compile_error!

  derive
  macro_rules
  proc_macro
  proc_macro_attribute
  proc_macro_derive
  proc_macro_hack

  std core alloc
  prelude
  rustc
  cargo
  rustfmt
  clippy

  io fs path env process thread time net
  collections cmp convert
  fmt hash iter ops mem ptr slice str
  sync cell rc borrow
  error any
  num ffi marker pin task future backtrace
  arch intrinsics hint

  Read Write BufRead Seek
  BufReader BufWriter LineWriter Cursor
  Stdin Stdout Stderr
  StdinLock StdoutLock StderrLock

  read_to_string read_to_end
  read write read_line lines
  bytes chars
  flush
  seek stream_position rewind
  set_len sync_all sync_data
  metadata

  File OpenOptions
  create create_new open
  append truncate read
  write
  create_dir create_dir_all
  remove_file remove_dir remove_dir_all
  rename copy
  canonicalize symlink_metadata
  hard_link read_link
  set_permissions
  Permissions FileType Metadata DirEntry ReadDir

  read_dir
  read_link
  copy
  rename
  remove_file
  remove_dir
  remove_dir_all

  Path PathBuf
  OsStr OsString
  Components Component
  Prefix PrefixComponent
  RootDir CurDir ParentDir Normal
  MAIN_SEPARATOR
  join push pop
  as_path
  file_name file_stem extension
  parent ancestors components
  starts_with ends_with
  exists
  is_file is_dir
  is_absolute is_relative
  to_str to_string_lossy
  into_os_string

  env::args env::args_os
  env::var env::var_os
  env::vars env::vars_os
  env::current_dir
  env::set_current_dir
  env::current_exe
  env::temp_dir
  env::home_dir
  env::set_var
  env::remove_var

  Command Stdio Child
  ChildStdin ChildStdout ChildStderr
  Output ExitStatus ExitCode
  spawn status output
  stdin stdout stderr
  kill wait try_wait
  id
  process::exit
  process::abort

  thread::spawn
  thread::current
  thread::sleep
  thread::yield_now
  thread::park
  thread::park_timeout
  Builder JoinHandle Thread

  Duration Instant SystemTime UNIX_EPOCH
  elapsed duration_since
  checked_add checked_sub
  saturating_add saturating_sub
  as_secs as_millis as_micros as_nanos
  from_secs from_millis from_micros from_nanos

  TcpStream TcpListener UdpSocket
  SocketAddr SocketAddrV4 SocketAddrV6
  IpAddr Ipv4Addr Ipv6Addr
  Shutdown
  connect bind accept
  local_addr peer_addr
  set_nonblocking
  set_read_timeout set_write_timeout
  read_timeout write_timeout
  shutdown try_clone

  io::Error
  io::ErrorKind
  io::Result
  NotFound PermissionDenied
  ConnectionRefused ConnectionReset ConnectionAborted
  NotConnected AddrInUse AddrNotAvailable
  BrokenPipe AlreadyExists WouldBlock
  InvalidInput InvalidData TimedOut
  WriteZero Interrupted Unsupported
  UnexpectedEof OutOfMemory Other

  Error ErrorKind Result
  Ok Err

  is_ok is_err
  is_ok_and is_err_and
  ok err
  unwrap expect
  unwrap_or unwrap_or_else unwrap_or_default
  map map_err
  map_or map_or_else
  inspect
  and and_then
  or or_else
  flatten transpose
  as_ref as_mut
  as_deref as_deref_mut
  copied cloned
  contains
  is_some is_none
  is_some_and
  filter
  zip unzip

  panic::panic_any
  catch_unwind
  resume_unwind
  AssertUnwindSafe
  UnwindSafe RefUnwindSafe

  Backtrace BacktraceStatus
  capture disabled force_capture

  iter into_iter
  next nth last count size_hint
  advance_by step_by
  enumerate peekable peek
  fuse chain zip cycle
  take take_while skip skip_while
  map map_while filter filter_map
  flat_map flatten scan inspect by_ref
  cloned copied rev

  fold try_fold
  reduce try_reduce
  collect
  partition partition_in_place
  find find_map
  position rposition
  any all
  min max min_by max_by
  min_by_key max_by_key
  cmp partial_cmp

  Vec::new
  Vec::with_capacity
  Vec::from
  Vec::from_iter
  push pop
  insert remove swap_remove
  retain dedup
  truncate clear
  reserve reserve_exact
  shrink_to shrink_to_fit
  resize resize_with
  split_off append drain splice
  windows chunks chunks_exact
  rchunks rchunks_exact
  chunks_mut
  split_at split_at_mut
  split_first split_last
  first first_mut
  last last_mut
  get get_mut
  as_slice as_mut_slice
  len is_empty capacity

  String::new
  String::with_capacity
  String::from
  String::from_utf8
  String::from_utf8_lossy
  into_bytes
  as_bytes as_str
  push push_str pop
  remove insert insert_str
  truncate retain clear
  reserve shrink_to_fit capacity len
  replace replacen replace_range
  split_off
  split split_whitespace
  lines chars char_indices
  matches rmatches
  contains starts_with ends_with
  find rfind
  trim trim_start trim_end
  to_lowercase to_uppercase
  repeat

  HashMap::new
  HashMap::with_capacity
  insert insert_entry
  get get_key_value get_mut
  remove remove_entry
  entry
  or_insert or_insert_with or_default
  and_modify
  contains_key
  keys values values_mut
  iter iter_mut drain retain
  capacity reserve shrink_to_fit

  HashSet::new
  HashSet::with_capacity
  insert replace remove take
  contains get
  is_disjoint is_subset is_superset
  union intersection difference symmetric_difference
  iter drain retain

  BTreeMap BTreeSet
  BinaryHeap VecDeque LinkedList

  Arc::new Arc::clone
  Arc::downgrade Arc::strong_count Arc::weak_count
  Weak::upgrade
  Rc::new Rc::clone
  Rc::downgrade Rc::strong_count Rc::weak_count

  Mutex::new
  lock try_lock
  into_inner get_mut
  RwLock::new
  read try_read
  write try_write

  Condvar
  wait wait_timeout
  notify_one notify_all

  Barrier
  wait

  Once
  call_once call_once_force
  OnceLock
  get get_mut get_or_init get_or_try_init set
  LazyLock
  force

  AtomicBool
  AtomicI8 AtomicI16 AtomicI32 AtomicI64 AtomicIsize
  AtomicU8 AtomicU16 AtomicU32 AtomicU64 AtomicUsize
  AtomicPtr

  load store swap
  compare_exchange compare_exchange_weak
  fetch_add fetch_sub
  fetch_and fetch_or fetch_xor
  fetch_max fetch_min

  Ordering
  Relaxed Release Acquire AcqRel SeqCst

  mpsc
  Sender SyncSender Receiver
  channel sync_channel
  send recv
  recv_timeout try_recv
  try_iter
  SendError SyncSender
  RecvError TryRecvError RecvTimeoutError

  async await
  Future
  Poll Ready Pending
  Waker Context
  Pin
  PinMut
  RawWaker RawWakerVTable
  wake wake_by_ref
  clone drop
  poll
  poll_fn ready

  Default::default
  Clone::clone
  Iterator::next
  IntoIterator::into_iter
  From::from
  Into::into
  TryFrom::try_from
  TryInto::try_into
  AsRef::as_ref
  AsMut::as_mut
  Borrow::borrow
  BorrowMut::borrow_mut
  Deref::deref
  DerefMut::deref_mut

  std::fmt
  Display Debug Formatter
  format_args
  write_fmt
  fmt

  std::error
  Error::source
  Error::description
  Error::cause
  Error::provide

  std::mem
  size_of size_of_val
  align_of align_of_val
  needs_drop
  drop replace swap take
  forget
  transmute
  zeroed
  MaybeUninit
  ManuallyDrop

  std::ptr
  null null_mut
  read read_unaligned
  write write_unaligned
  copy copy_nonoverlapping
  replace swap
  addr_of addr_of_mut
  drop_in_place
  offset add sub
  read_volatile write_volatile

  std::slice
  from_raw_parts
  from_raw_parts_mut
  from_ref from_mut
  to_vec

  std::str
  from_utf8
  from_utf8_unchecked
  from_utf8_mut
  Utf8Error

  std::convert
  Infallible identity
  TryFrom TryInto

  std::num
  ParseIntError ParseFloatError
  Wrapping Saturating
  NonZeroU8 NonZeroU16 NonZeroU32 NonZeroU64 NonZeroUsize
  NonZeroI8 NonZeroI16 NonZeroI32 NonZeroI64 NonZeroIsize

  std::cmp
  Ordering Equal Less Greater
  min max min_by max_by
  min_by_key max_by_key

  std::sync
  Arc Weak Mutex RwLock Condvar
  Once OnceLock LazyLock Barrier
  mpsc Sender SyncSender Receiver
  atomic

  std::thread
  spawn current sleep yield_now
  park park_timeout
  Thread JoinHandle Builder

  std::time
  Duration Instant SystemTime UNIX_EPOCH

  std::env
  args args_os var var_os
  vars vars_os
  current_dir set_current_dir
  current_exe temp_dir

  std::process
  Command Child ExitStatus ExitCode Output Stdio
  spawn status output
  exit abort id

  std::fs
  File OpenOptions Metadata Permissions
  FileType DirEntry ReadDir
  read read_to_string write
  copy create create_dir create_dir_all
  remove_file remove_dir remove_dir_all
  rename canonicalize
  metadata symlink_metadata
  read_dir read_link
  hard_link set_permissions

  std::path
  Path PathBuf Component Components
  Prefix PrefixComponent

  std::io
  Read Write BufRead Seek
  BufReader BufWriter LineWriter Cursor
  Error ErrorKind Result

  std::net
  TcpStream TcpListener UdpSocket
  IpAddr Ipv4Addr Ipv6Addr
  SocketAddr SocketAddrV4 SocketAddrV6
  Shutdown

  std::ffi
  CString CStr
  OsStr OsString
  c_void c_char c_int c_uint
  c_long c_ulong

  std::os
  raw unix windows
  fd fs handle
  AsRawFd AsFd
  AsRawHandle AsHandle
  RawFd BorrowedFd OwnedFd
  RawHandle BorrowedHandle OwnedHandle

  std::boxed Box
  std::rc Rc Weak
  std::cell Cell RefCell OnceCell LazyCell
  std::borrow Borrow BorrowMut Cow
  std::marker PhantomData PhantomPinned
  Send Sync Sized Unpin
  std::any Any TypeId
  type_name type_name_of_val

  std::future Future
  Ready Pending
  poll_fn ready

  std::task Context Poll Waker
  RawWaker RawWakerVTable

  std::pin Pin

  std::backtrace
  Backtrace BacktraceStatus

  std::panic
  catch_unwind resume_unwind
  AssertUnwindSafe UnwindSafe RefUnwindSafe

  std::hint
  black_box spin_loop
  likely unlikely

  std::arch
  asm global_asm
  x86_64 x86
  aarch64 arm
  wasm32

  serde
  serde_json
  Serialize Deserialize
  Serializer Deserializer
  serde::Serialize
  serde::Deserialize
  serde::Serializer
  serde::Deserializer

  Value Map Number
  json!
  to_string
  to_string_pretty
  to_vec
  to_vec_pretty
  to_writer
  to_writer_pretty
  from_str
  from_slice
  from_reader
  from_value
  to_value

  Value::Null
  Value::Bool
  Value::Number
  Value::String
  Value::Array
  Value::Object

  is_null
  is_boolean
  is_number
  is_string
  is_array
  is_object
  as_bool
  as_i64
  as_u64
  as_f64
  as_str
  as_array
  as_array_mut
  as_object
  as_object_mut
  get
  get_mut
  pointer
  pointer_mut

  serde_json::from_str
  serde_json::from_slice
  serde_json::from_reader
  serde_json::to_string
  serde_json::to_string_pretty
  serde_json::to_vec
  serde_json::to_vec_pretty
  serde_json::to_writer
  serde_json::to_writer_pretty
  serde_json::from_value
  serde_json::to_value

  serde_json::Error
  serde_json::Result

  serde_json::Map
  serde_json::Number
  serde_json::Value

  serde
  serde_derive
  serde_json

  tokio
  tokio::main
  tokio::test
  tokio::spawn
  tokio::join
  tokio::select
  tokio::time
  tokio::fs
  tokio::net
  tokio::sync
  tokio::io
  tokio::process

  reqwest
  Client
  Request
  Response
  StatusCode
  Method
  HeaderMap
  HeaderValue
  Url
  get post put patch delete
  send
  json
  text
  bytes
  error_for_status

  anyhow
  anyhow!
  Context
  bail!
  ensure!
  Result
  Error
  anyhow

  thiserror
  Error
  error
  from
  source
  transparent

  clap
  Parser
  Subcommand
  Args
  ValueEnum
  command
  arg
  short
  long
  default_value
  required
  value_parser

  regex
  Regex
  RegexBuilder
  captures
  captures_iter
  find
  find_iter
  is_match
  replace
  replace_all
  split
  splitn

  chrono
  DateTime
  NaiveDate
  NaiveDateTime
  NaiveTime
  Duration
  Utc
  Local
  Datelike
  Timelike
  TimeZone

  uuid
  Uuid
  new_v4
  parse
  to_string

  rand
  Rng
  thread_rng
  random
  gen
  gen_range
  sample
  shuffle

  tracing
  tracing_subscriber
  info!
  debug!
  warn!
  error!
  trace!
  instrument
  span
  event

  log
  log!
  debug!
  info!
  warn!
  error!
  trace!

  rayon
  par_iter
  par_iter_mut
  into_par_iter
  ParallelIterator
  join
  scope

  crossbeam
  channel
  select
  scoped
  atomic

  bytes
  Bytes
  BytesMut
  Buf
  BufMut

  futures
  Stream
  StreamExt
  FutureExt
  Sink
  SinkExt
  select
  join
  try_join
  block_on

  async_trait
  async_trait

  axum
  Router
  routing
  get post put patch delete
  Json
  Path
  Query
  State
  Extension
  Request
  Response
  IntoResponse
  middleware
  extract
  response
  body
  serve

  actix_web
  App
  HttpServer
  HttpResponse
  web
  get post put delete
  Json
  Path
  Query
  Data
  Responder

  tauri
  command
  generate_handler!
  generate_context!
  Builder
  Manager
  AppHandle
  Window
  WebviewWindow
  State
  Emitter
  Listener
  Event
  emit
  emit_to
  listen
  listen_any
  invoke
  invoke_handler
  setup
  run
  plugin
  window
  webview
  path
  dialog
  fs
  shell
  process

  reqwest
  serde
  serde_json
  tokio
  anyhow
  thiserror
  clap
  regex
  chrono
  uuid
  tracing
  rayon
  axum
  tauri
`.split(/\s+/),

    python: `
  and as assert async await break case class continue def del elif else except finally
  for from global if import in is lambda match nonlocal not or pass raise return try
  while with yield

  True False None Ellipsis NotImplemented

  int float complex bool str bytes bytearray memoryview list tuple set frozenset dict range
  object type super property staticmethod classmethod
  Exception BaseException
  ArithmeticError AssertionError AttributeError BaseException
  BrokenPipeError BufferError BytesWarning ChildProcessError ConnectionAbortedError
  ConnectionError ConnectionRefusedError ConnectionResetError
  DeprecationWarning EOFError EncodingWarning EnvironmentError
  ExceptionGroup FileExistsError FileNotFoundError FloatingPointError
  FutureWarning GeneratorExit IOError ImportError IndentationError IndexError
  InterruptedError IsADirectoryError KeyError KeyboardInterrupt LookupError
  MemoryError ModuleNotFoundError NameError NotADirectoryError NotImplementedError
  OSError OverflowError PendingDeprecationWarning PermissionError
  ProcessLookupError RecursionError ReferenceError ResourceWarning RuntimeError
  RuntimeWarning StopAsyncIteration StopIteration SyntaxError SyntaxWarning
  SystemError SystemExit TabError TimeoutError TypeError UnboundLocalError
  UnicodeDecodeError UnicodeEncodeError UnicodeError UnicodeTranslateError
  UnicodeWarning UserWarning ValueError Warning ZeroDivisionError
  zipfile.BadZipFile
  http.client.HTTPException

  print input open breakpoint help
  len range enumerate zip map filter reversed sorted
  min max sum abs round pow divmod
  all any
  isinstance issubclass
  getattr setattr hasattr delattr
  callable dir vars locals globals
  id hash
  iter next anext
  format repr ascii
  chr ord bin oct hex
  compile eval exec
  memoryview
  __import__

  append extend insert remove pop clear index count sort reverse copy
  add discard update
  union intersection difference symmetric_difference
  issubset issuperset isdisjoint
  keys values items get setdefault pop popitem
  fromkeys

  capitalize casefold center count encode endswith expandtabs
  find format index isalnum isalpha isascii isdecimal isdigit
  isidentifier islower isnumeric isprintable isspace istitle isupper
  join ljust lower lstrip partition replace rfind rindex
  rjust rpartition rsplit rstrip split splitlines
  startswith strip swapcase title translate upper zfill
  maketrans encode decode

  __name__ __main__ __file__ __package__ __path__ __spec__
  __loader__ __cached__ __builtins__ __annotations__ __dict__ __slots__
  __doc__ __module__ __qualname__ __class__ __bases__ __mro__
  __subclasses__ __init__ __new__ __del__
  __str__ __repr__ __bytes__ __format__
  __bool__ __len__ __iter__ __next__ __reversed__
  __getitem__ __setitem__ __delitem__ __contains__
  __getattr__ __getattribute__ __setattr__ __delattr__
  __call__ __enter__ __exit__ __aenter__ __aexit__
  __hash__ __eq__ __ne__ __lt__ __le__ __gt__ __ge__
  __add__ __radd__ __sub__ __rsub__
  __mul__ __rmul__ __truediv__ __rtruediv__
  __floordiv__ __rfloordiv__ __mod__ __rmod__
  __pow__ __rpow__ __matmul__ __rmatmul__
  __neg__ __pos__ __abs__
  __invert__ __and__ __rand__ __or__ __ror__
  __xor__ __rxor__ __lshift__ __rlshift__
  __rshift__ __rrshift__
  __bool__ __int__ __float__ __index__
  __complex__ __round__ __trunc__ __floor__ __ceil__
  __enter__ __exit__
  __aiter__ __anext__
  __await__
  __copy__ __deepcopy__
  __reduce__ __reduce_ex__
  __getnewargs__ __getstate__ __setstate__
  __init_subclass__ __set_name__
  __prepare__ __instancecheck__ __subclasscheck__
  __class_getitem__
  __fspath__ __bytes__ __str__

  abc
  aifc
  argparse
  array
  ast
  asyncio
  atexit
  audioop
  base64
  bdb
  binascii
  bisect
  builtins
  bz2
  cProfile
  calendar
  cgi
  cgitb
  chunk
  cmath
  cmd
  code
  codecs
  codeop
  collections
  collections.abc
  colorsys
  compileall
  concurrent
  configparser
  contextlib
  contextvars
  copy
  copyreg
  csv
  ctypes
  curses
  dataclasses
  datetime
  dbm
  decimal
  difflib
  dis
  doctest
  email
  encodings
  enum
  errno
  faulthandler
  fcntl
  filecmp
  fileinput
  fnmatch
  fractions
  ftplib
  functools
  gc
  getpass
  gettext
  glob
  graphlib
  gzip
  hashlib
  heapq
  hmac
  html
  http
  http.client
  http.cookiejar
  http.server
  imaplib
  importlib
  importlib.abc
  importlib.machinery
  importlib.metadata
  importlib.resources
  inspect
  io
  ipaddress
  itertools
  json
  keyword
  linecache
  locale
  logging
  lzma
  mailbox
  marshal
  math
  mimetypes
  mmap
  modulefinder
  multiprocessing
  netrc
  numbers
  operator
  os
  pathlib
  pdb
  pickle
  pickletools
  pkgutil
  platform
  plistlib
  poplib
  pprint
  profile
  pstats
  pty
  pwd
  queue
  quopri
  random
  re
  readline
  reprlib
  resource
  rlcompleter
  runpy
  sched
  secrets
  select
  selectors
  shelve
  shlex
  shutil
  signal
  site
  smtpd
  smtplib
  socket
  socketserver
  sqlite3
  ssl
  stat
  statistics
  string
  stringprep
  struct
  subprocess
  symtable
  sys
  sysconfig
  syslog
  tabnanny
  tarfile
  tempfile
  termios
  textwrap
  threading
  time
  timeit
  tkinter
  token
  tokenize
  tomllib
  trace
  traceback
  tracemalloc
  tty
  turtle
  types
  typing
  typing_extensions
  unicodedata
  unittest
  urllib
  urllib.error
  urllib.parse
  urllib.request
  urllib.robotparser
  uuid
  venv
  warnings
  wave
  weakref
  webbrowser
  xml
  xml.etree
  xml.dom
  xml.parsers
  zipapp
  zipfile
  zoneinfo

  defaultdict
  OrderedDict
  Counter
  ChainMap
  UserDict
  UserList
  UserString
  deque
  namedtuple

  dataclass field fields
  asdict astuple replace
  is_dataclass

  Enum IntEnum StrEnum Flag IntFlag ReprEnum
  auto unique verify member

  abstractmethod abstractclassmethod abstractstaticmethod
  ABC ABCMeta

  Any
  AnyStr
  BinaryIO
  ByteString
  Callable
  Collection
  Container
  Coroutine
  Dict
  Final
  ForwardRef
  Generator
  Hashable
  IO
  Iterable
  Iterator
  List
  Literal
  Mapping
  MutableMapping
  MutableSequence
  MutableSet
  NamedTuple
  NewType
  NoReturn
  Optional
  Protocol
  Reversible
  Sequence
  Set
  Sized
  SupportsBytes
  SupportsComplex
  SupportsFloat
  SupportsIndex
  SupportsInt
  SupportsRound
  Text
  TextIO
  Tuple
  Type
  TypeAlias
  TypeGuard
  TypeVar
  TypedDict
  Union
  Unpack
  Callable
  ParamSpec
  Concatenate
  Type
  Self
  Never
  LiteralString
  TypeIs
  NotRequired
  Required
  ReadOnly

  cast
  overload
  get_type_hints
  get_origin
  get_args
  is_typeddict
  runtime_checkable
  final
  override
  no_type_check
  no_type_check_decorator

  asyncio.run
  asyncio.create_task
  asyncio.current_task
  asyncio.all_tasks
  asyncio.gather
  asyncio.wait
  asyncio.wait_for
  asyncio.timeout
  asyncio.as_completed
  asyncio.shield
  asyncio.sleep
  asyncio.to_thread
  asyncio.run_coroutine_threadsafe
  asyncio.get_running_loop
  asyncio.get_event_loop
  asyncio.new_event_loop
  asyncio.set_event_loop
  asyncio.get_event_loop_policy
  asyncio.set_event_loop_policy
  asyncio.iscoroutine
  asyncio.iscoroutinefunction
  asyncio.isfuture
  asyncio.Future
  asyncio.Task
  asyncio.TaskGroup
  asyncio.Lock
  asyncio.Event
  asyncio.Condition
  asyncio.Semaphore
  asyncio.BoundedSemaphore
  asyncio.Barrier
  asyncio.Queue
  asyncio.PriorityQueue
  asyncio.LifoQueue
  asyncio.StreamReader
  asyncio.StreamWriter
  asyncio.start_server
  asyncio.start_unix_server
  asyncio.open_connection
  asyncio.open_unix_connection
  asyncio.Timeout
  asyncio.CancelledError
  asyncio.TimeoutError

  threading.Thread
  threading.current_thread
  threading.main_thread
  threading.active_count
  threading.enumerate
  threading.get_ident
  threading.get_native_id
  threading.local
  threading.Lock
  threading.RLock
  threading.Condition
  threading.Semaphore
  threading.BoundedSemaphore
  threading.Event
  threading.Barrier
  threading.Timer
  threading.excepthook

  multiprocessing.Process
  multiprocessing.Pool
  multiprocessing.Queue
  multiprocessing.SimpleQueue
  multiprocessing.JoinableQueue
  multiprocessing.Pipe
  multiprocessing.Lock
  multiprocessing.RLock
  multiprocessing.Semaphore
  multiprocessing.BoundedSemaphore
  multiprocessing.Event
  multiprocessing.Condition
  multiprocessing.Value
  multiprocessing.Array
  multiprocessing.Manager
  multiprocessing.cpu_count
  multiprocessing.current_process
  multiprocessing.active_children

  concurrent.futures
  ThreadPoolExecutor
  ProcessPoolExecutor
  Future
  as_completed
  wait
  FIRST_COMPLETED
  FIRST_EXCEPTION
  ALL_COMPLETED

  functools.reduce
  functools.partial
  functools.partialmethod
  functools.lru_cache
  functools.cache
  functools.cached_property
  functools.singledispatch
  functools.singledispatchmethod
  functools.wraps
  functools.update_wrapper
  functools.total_ordering
  functools.cmp_to_key

  itertools.accumulate
  itertools.chain
  itertools.combinations
  itertools.combinations_with_replacement
  itertools.compress
  itertools.count
  itertools.cycle
  itertools.dropwhile
  itertools.filterfalse
  itertools.groupby
  itertools.islice
  itertools.pairwise
  itertools.permutations
  itertools.product
  itertools.repeat
  itertools.starmap
  itertools.takewhile
  itertools.tee
  itertools.zip_longest

  operator.add
  operator.and_
  operator.attrgetter
  operator.call
  operator.concat
  operator.contains
  operator.countOf
  operator.eq
  operator.floordiv
  operator.ge
  operator.getitem
  operator.gt
  operator.iadd
  operator.iand
  operator.iconcat
  operator.ifloordiv
  operator.imatmul
  operator.imod
  operator.imul
  operator.index
  operator.indexOf
  operator.inv
  operator.invert
  operator.ior
  operator.ipow
  operator.is_
  operator.is_not
  operator.istartswith
  operator.ixor
  operator.le
  operator.length_hint
  operator.lshift
  operator.lt
  operator.matmul
  operator.methodcaller
  operator.mod
  operator.mul
  operator.ne
  operator.neg
  operator.not_
  operator.or_
  operator.pos
  operator.pow
  operator.rshift
  operator.setitem
  operator.sub
  operator.truediv
  operator.truth
  operator.xor
  operator.itemgetter

  heapq.heappush
  heapq.heappop
  heapq.heapify
  heapq.heapreplace
  heapq.heappushpop
  heapq.nlargest
  heapq.nsmallest
  heapq.merge

  bisect.bisect
  bisect.bisect_left
  bisect.bisect_right
  bisect.insort
  bisect.insort_left
  bisect.insort_right

  re.compile
  re.escape
  re.search
  re.match
  re.fullmatch
  re.findall
  re.finditer
  re.split
  re.sub
  re.subn
  re.purge
  re.escape
  Pattern
  Match
  Scanner

  json.dump
  json.dumps
  json.load
  json.loads
  json.JSONEncoder
  json.JSONDecoder
  json.JSONDecodeError

  pathlib.Path
  pathlib.PurePath
  pathlib.PurePosixPath
  pathlib.PureWindowsPath
  pathlib.Path.cwd
  pathlib.Path.home
  pathlib.Path.exists
  pathlib.Path.is_file
  pathlib.Path.is_dir
  pathlib.Path.is_symlink
  pathlib.Path.is_mount
  pathlib.Path.mkdir
  pathlib.Path.rmdir
  pathlib.Path.unlink
  pathlib.Path.rename
  pathlib.Path.replace
  pathlib.Path.touch
  pathlib.Path.read_text
  pathlib.Path.write_text
  pathlib.Path.read_bytes
  pathlib.Path.write_bytes
  pathlib.Path.iterdir
  pathlib.Path.glob
  pathlib.Path.rglob
  pathlib.Path.match
  pathlib.Path.resolve
  pathlib.Path.absolute
  pathlib.Path.stat
  pathlib.Path.lstat
  pathlib.Path.chmod
  pathlib.Path.owner
  pathlib.Path.group
  pathlib.Path.samefile
  pathlib.Path.symlink_to
  pathlib.Path.hardlink_to
  pathlib.Path.readlink

  os.name
  os.sep
  os.altsep
  os.extsep
  os.pathsep
  os.linesep
  os.curdir
  os.pardir
  os.defpath
  os.devnull
  os.environ
  os.environb
  os.getcwd
  os.chdir
  os.fchdir
  os.listdir
  os.scandir
  os.walk
  os.fwalk
  os.mkdir
  os.makedirs
  os.mkfifo
  os.mknod
  os.remove
  os.unlink
  os.rmdir
  os.removedirs
  os.rename
  os.renames
  os.replace
  os.link
  os.symlink
  os.readlink
  os.stat
  os.lstat
  os.chmod
  os.chown
  os.access
  os.umask
  os.getpid
  os.getppid
  os.getuid
  os.getgid
  os.geteuid
  os.getegid
  os.getgroups
  os.cpu_count
  os.getlogin
  os.get_terminal_size
  os.system
  os.popen
  os.execv
  os.execve
  os.execvp
  os.execl
  os.execlp
  os.execle
  os.spawnv
  os.fork
  os.kill
  os.pipe
  os.dup
  os.dup2
  os.fdopen
  os.urandom
  os.add_dll_directory

  os.path.abspath
  os.path.basename
  os.path.commonpath
  os.path.commonprefix
  os.path.dirname
  os.path.exists
  os.path.expanduser
  os.path.expandvars
  os.path.getatime
  os.path.getctime
  os.path.getmtime
  os.path.getsize
  os.path.isabs
  os.path.isfile
  os.path.isdir
  os.path.islink
  os.path.ismount
  os.path.join
  os.path.normcase
  os.path.normpath
  os.path.realpath
  os.path.relpath
  os.path.samefile
  os.path.split
  os.path.splitext
  os.path.splitdrive
  os.path.sameopenfile
  os.path.lexists

  shutil.copy
  shutil.copyfile
  shutil.copy2
  shutil.copytree
  shutil.move
  shutil.rmtree
  shutil.disk_usage
  shutil.which
  shutil.chown
  shutil.make_archive
  shutil.unpack_archive

  tempfile.TemporaryFile
  tempfile.NamedTemporaryFile
  tempfile.SpooledTemporaryFile
  tempfile.TemporaryDirectory
  tempfile.mkstemp
  tempfile.mkdtemp
  tempfile.gettempdir
  tempfile.gettempdirb
  tempfile.gettempprefix

  subprocess.run
  subprocess.Popen
  subprocess.call
  subprocess.check_call
  subprocess.check_output
  subprocess.getoutput
  subprocess.getstatusoutput
  subprocess.PIPE
  subprocess.STDOUT
  subprocess.DEVNULL
  subprocess.TimeoutExpired
  subprocess.CompletedProcess
  subprocess.CalledProcessError

  sys.argv
  sys.path
  sys.modules
  sys.meta_path
  sys.path_hooks
  sys.executable
  sys.prefix
  sys.base_prefix
  sys.version
  sys.version_info
  sys.platform
  sys.implementation
  sys.stdin
  sys.stdout
  sys.stderr
  sys.__stdin__
  sys.__stdout__
  sys.__stderr__
  sys.exit
  sys.exitfunc
  sys.exc_info
  sys.exception
  sys.last_traceback
  sys.breakpointhook
  sys.displayhook
  sys.excepthook
  sys.getsizeof
  sys.getrefcount
  sys.intern
  sys.setrecursionlimit

  traceback.print_exc
  traceback.print_exception
  traceback.format_exc
  traceback.format_exception
  traceback.format_tb
  traceback.extract_tb
  traceback.extract_stack
  traceback.walk_tb
  traceback.clear_frames
  traceback.TracebackException
  traceback.StackSummary
  traceback.FrameSummary

  logging.debug
  logging.info
  logging.warning
  logging.error
  logging.critical
  logging.exception
  logging.log
  logging.basicConfig
  logging.getLogger
  logging.Logger
  logging.Handler
  logging.StreamHandler
  logging.FileHandler
  logging.handlers
  logging.Formatter
  logging.Filter
  logging.Filterer
  logging.NullHandler
  logging.DEBUG
  logging.INFO
  logging.WARNING
  logging.ERROR
  logging.CRITICAL
  logging.NOTSET

  datetime.date
  datetime.time
  datetime.datetime
  datetime.timedelta
  datetime.tzinfo
  datetime.timezone
  datetime.date.today
  datetime.datetime.now
  datetime.datetime.utcnow
  datetime.datetime.fromtimestamp
  datetime.datetime.fromisoformat
  datetime.datetime.strptime
  datetime.datetime.strftime
  datetime.datetime.timestamp
  datetime.datetime.isoformat
  datetime.timedelta.days
  datetime.timedelta.seconds
  datetime.timedelta.microseconds

  math.pi
  math.e
  math.tau
  math.inf
  math.nan
  math.isfinite
  math.isinf
  math.isnan
  math.isclose
  math.prod
  math.factorial
  math.gcd
  math.lcm
  math.comb
  math.perm
  math.fabs
  math.fmod
  math.remainder
  math.trunc
  math.floor
  math.ceil
  math.sqrt
  math.cbrt
  math.exp
  math.exp2
  math.expm1
  math.log
  math.log1p
  math.log2
  math.log10
  math.pow
  math.sin
  math.cos
  math.tan
  math.asin
  math.acos
  math.atan
  math.atan2
  math.sinh
  math.cosh
  math.tanh
  math.asinh
  math.acosh
  math.atanh
  math.degrees
  math.radians
  math.hypot
  math.erf
  math.erfc
  math.gamma
  math.lgamma

  random.seed
  random.getstate
  random.setstate
  random.getrandbits
  random.randbytes
  random.randrange
  random.randint
  random.choice
  random.choices
  random.shuffle
  random.sample
  random.random
  random.uniform
  random.triangular
  random.betavariate
  random.expovariate
  random.gammavariate
  random.gauss
  random.lognormvariate
  random.normalvariate
  random.paretovariate
  random.rayleigh
  random.vonmisesvariate
  random.weibullvariate

  statistics.mean
  statistics.fmean
  statistics.geometric_mean
  statistics.harmonic_mean
  statistics.median
  statistics.median_low
  statistics.median_high
  statistics.median_grouped
  statistics.mode
  statistics.multimode
  statistics.pstdev
  statistics.pvariance
  statistics.stdev
  statistics.variance
  statistics.quantiles
  statistics.covariance
  statistics.correlation
  statistics.linear_regression

  decimal.Decimal
  decimal.Context
  decimal.localcontext
  decimal.getcontext
  decimal.setcontext
  decimal.DecimalException
  decimal.InvalidOperation
  decimal.DivisionByZero
  decimal.Overflow
  decimal.Underflow
  decimal.Inexact
  decimal.Rounded
  decimal.Subnormal

  fractions.Fraction
  fractions.gcd

  secrets.token_bytes
  secrets.token_hex
  secrets.token_urlsafe
  secrets.choice
  secrets.randbelow
  secrets.randbits

  hashlib.md5
  hashlib.sha1
  hashlib.sha224
  hashlib.sha256
  hashlib.sha384
  hashlib.sha512
  hashlib.sha3_224
  hashlib.sha3_256
  hashlib.sha3_384
  hashlib.sha3_512
  hashlib.blake2b
  hashlib.blake2s
  hashlib.scrypt
  hashlib.pbkdf2_hmac

  hmac.new
  hmac.compare_digest

  base64.b64encode
  base64.b64decode
  base64.urlsafe_b64encode
  base64.urlsafe_b64decode
  base64.standard_b64encode
  base64.standard_b64decode
  base64.b32encode
  base64.b32decode
  base64.b16encode
  base64.b16decode

  uuid.UUID
  uuid.uuid1
  uuid.uuid3
  uuid.uuid4
  uuid.uuid5
  uuid.getnode
  uuid.NAMESPACE_DNS
  uuid.NAMESPACE_URL
  uuid.NAMESPACE_OID
  uuid.NAMESPACE_X500

  urllib.parse.urlparse
  urllib.parse.urlunparse
  urllib.parse.urljoin
  urllib.parse.urlencode
  urllib.parse.parse_qs
  urllib.parse.parse_qsl
  urllib.parse.quote
  urllib.parse.quote_plus
  urllib.parse.unquote
  urllib.parse.unquote_plus
  urllib.parse.urlsplit
  urllib.parse.urlunsplit

  urllib.request.urlopen
  urllib.request.Request
  urllib.request.build_opener
  urllib.request.install_opener
  urllib.request.urlretrieve

  urllib.error.URLError
  urllib.error.HTTPError

  http.client.HTTPConnection
  http.client.HTTPSConnection
  http.client.HTTPResponse
  http.client.HTTPMessage
  http.client.HTTPException

  http.server.HTTPServer
  http.server.ThreadingHTTPServer
  http.server.BaseHTTPRequestHandler
  http.server.SimpleHTTPRequestHandler

  socket.socket
  socket.create_connection
  socket.create_server
  socket.getaddrinfo
  socket.gethostbyname
  socket.gethostname
  socket.getfqdn
  socket.AF_INET
  socket.AF_INET6
  socket.SOCK_STREAM
  socket.SOCK_DGRAM
  socket.SOCK_RAW
  socket.IPPROTO_TCP
  socket.IPPROTO_UDP
  socket.SOL_SOCKET
  socket.SO_REUSEADDR
  socket.SO_BROADCAST
  socket.SO_KEEPALIVE
  socket.SHUT_RD
  socket.SHUT_WR
  socket.SHUT_RDWR

  ssl.SSLContext
  ssl.create_default_context
  ssl.wrap_socket
  ssl.PROTOCOL_TLS_CLIENT
  ssl.PROTOCOL_TLS_SERVER
  ssl.CERT_NONE
  ssl.CERT_OPTIONAL
  ssl.CERT_REQUIRED

  sqlite3.connect
  sqlite3.Connection
  sqlite3.Cursor
  sqlite3.Row
  sqlite3.Binary
  sqlite3.adapt
  sqlite3.register_adapter
  sqlite3.register_converter
  sqlite3.complete_statement
  sqlite3.connect
  execute
  executemany
  executescript
  fetchone
  fetchmany
  fetchall
  commit
  rollback
  close

  csv.reader
  csv.writer
  csv.DictReader
  csv.DictWriter
  csv.register_dialect
  csv.get_dialect
  csv.list_dialects
  csv.Sniffer

  configparser.ConfigParser
  configparser.RawConfigParser
  configparser.SectionProxy

  argparse.ArgumentParser
  argparse.Namespace
  argparse.ArgumentTypeError
  argparse.FileType
  add_argument
  add_subparsers
  add_parser
  parse_args
  parse_known_args
  parse_intermixed_args
  set_defaults
  set_default
  add_mutually_exclusive_group
  add_argument_group

  unittest.TestCase
  unittest.TestSuite
  unittest.TestLoader
  unittest.TextTestRunner
  unittest.TestResult
  unittest.mock
  unittest.main
  assertEqual
  assertNotEqual
  assertTrue
  assertFalse
  assertIs
  assertIsNot
  assertIsNone
  assertIsNotNone
  assertIn
  assertNotIn
  assertIsInstance
  assertNotIsInstance
  assertRaises
  assertRaisesRegex
  assertWarns
  assertWarnsRegex
  assertAlmostEqual
  assertNotAlmostEqual
  assertGreater
  assertGreaterEqual
  assertLess
  assertLessEqual
  assertRegex
  assertNotRegex

  dataclasses.dataclass
  dataclasses.field
  dataclasses.fields
  dataclasses.asdict
  dataclasses.astuple
  dataclasses.replace
  dataclasses.is_dataclass
  dataclasses.KW_ONLY
  dataclasses.InitVar

  enum.Enum
  enum.IntEnum
  enum.StrEnum
  enum.Flag
  enum.IntFlag
  enum.auto
  enum.unique
  enum.verify

  contextlib.contextmanager
  contextlib.asynccontextmanager
  contextlib.closing
  contextlib.aclosing
  contextlib.suppress
  contextlib.redirect_stdout
  contextlib.redirect_stderr
  contextlib.redirect_stdin
  contextlib.nullcontext
  contextlib.chdir

  warnings.warn
  warnings.warn_explicit
  warnings.simplefilter
  warnings.filterwarnings
  warnings.resetwarnings

  inspect.getmembers
  inspect.getmodule
  inspect.getsource
  inspect.getfile
  inspect.getdoc
  inspect.signature
  inspect.isclass
  inspect.isfunction
  inspect.ismethod
  inspect.isbuiltin
  inspect.isgenerator
  inspect.isgeneratorfunction
  inspect.iscoroutine
  inspect.iscoroutinefunction
  inspect.isasyncgen
  inspect.isasyncgenfunction
  inspect.isawaitable
  inspect.getannotations
  inspect.currentframe
  inspect.stack
  inspect.trace

  ast.parse
  ast.dump
  ast.literal_eval
  ast.fix_missing_locations
  ast.copy_location
  ast.increment_lineno
  ast.walk
  ast.NodeVisitor
  ast.NodeTransformer
  ast.Load
  ast.Store
  ast.Del
  ast.Module
  ast.FunctionDef
  ast.AsyncFunctionDef
  ast.ClassDef
  ast.Return
  ast.Delete
  ast.Assign
  ast.AnnAssign
  ast.AugAssign
  ast.For
  ast.AsyncFor
  ast.While
  ast.If
  ast.With
  ast.AsyncWith
  ast.Try
  ast.Raise
  ast.Assert
  ast.Import
  ast.ImportFrom
  ast.Global
  ast.Nonlocal
  ast.Expr
  ast.Pass
  ast.Break
  ast.Continue
  ast.BoolOp
  ast.BinOp
  ast.UnaryOp
  ast.Lambda
  ast.IfExp
  ast.Dict
  ast.Set
  ast.ListComp
  ast.SetComp
  ast.DictComp
  ast.GeneratorExp
  ast.Await
  ast.Yield
  ast.YieldFrom
  ast.Compare
  ast.Call
  ast.Attribute
  ast.Subscript
  ast.Constant
  ast.NamedExpr
  ast.Match

  pickle.dump
  pickle.dumps
  pickle.load
  pickle.loads
  pickle.Pickler
  pickle.Unpickler
  pickle.HIGHEST_PROTOCOL

  gzip.open
  bz2.open
  lzma.open
  zipfile.ZipFile
  zipfile.ZipInfo
  zipfile.is_zipfile
  tarfile.open
  tarfile.TarFile
  tarfile.TarInfo

  email.message.EmailMessage
  email.message.Message
  email.policy
  smtplib.SMTP
  smtplib.SMTP_SSL
  imaplib.IMAP4
  imaplib.IMAP4_SSL

  xml.etree.ElementTree
  ET.parse
  ET.fromstring
  ET.tostring
  ET.Element
  ET.SubElement
  ET.ElementTree
  ET.iterparse

  html.escape
  html.unescape

  pprint.pprint
  pprint.pformat

  platform.system
  platform.machine
  platform.processor
  platform.platform
  platform.python_version
  platform.release
  platform.node

  gc.collect
  gc.get_count
  gc.get_threshold
  gc.set_threshold
  gc.disable
  gc.enable
  gc.isenabled
  gc.get_objects
  gc.get_referents
  gc.get_referrers

  sys.settrace
  sys.setprofile
  sys.audit
  sys.addaudithook
  sys.setswitchinterval

  importlib.import_module
  importlib.reload
  importlib.invalidate_caches
  importlib.util
  importlib.machinery
  importlib.metadata
  importlib.resources

  pkgutil.iter_modules
  pkgutil.walk_packages
  pkgutil.get_data

  venv.EnvBuilder
  venv.create

  pathlib
  tempfile
  shutil
  glob.glob
  glob.iglob
  fnmatch.fnmatch
  fnmatch.fnmatchcase
  fnmatch.filter

  os.PathLike
  os.DirEntry

  tkinter.Tk
  tkinter.Toplevel
  tkinter.Frame
  tkinter.Label
  tkinter.Button
  tkinter.Entry
  tkinter.Text
  tkinter.Canvas
  tkinter.Listbox
  tkinter.Menu
  tkinter.Checkbutton
  tkinter.Radiobutton
  tkinter.Scale
  tkinter.Spinbox
  tkinter.Scrollbar
  tkinter.PhotoImage
  tkinter.StringVar
  tkinter.IntVar
  tkinter.BooleanVar
  tkinter.DoubleVar
  tkinter.messagebox
  tkinter.filedialog
  tkinter.colorchooser
  tkinter.simpledialog
  tkinter.ttk

  flask
  Flask
  request
  response
  jsonify
  render_template
  redirect
  url_for
  session
  flash
  abort
  make_response
  send_file
  send_from_directory
  Blueprint
  g
  current_app

  fastapi
  FastAPI
  APIRouter
  Request
  Response
  JSONResponse
  RedirectResponse
  FileResponse
  StreamingResponse
  HTTPException
  BackgroundTasks
  Depends
  Query
  Path
  Body
  Header
  Cookie
  Form
  File
  UploadFile
  WebSocket
  status

  django
  models
  views
  urls
  forms
  serializers
  admin
  middleware
  settings
  migrations
  HttpResponse
  JsonResponse
  render
  redirect
  get_object_or_404
  redirect
  reverse
  path
  re_path
  include

  requests
  requests.get
  requests.post
  requests.put
  requests.patch
  requests.delete
  requests.head
  requests.options
  requests.request
  requests.Session
  requests.Request
  requests.Response
  requests.PreparedRequest
  requests.exceptions
  requests.Timeout
  requests.ConnectionError
  requests.HTTPError
  requests.RequestException
  requests.adapters
  requests.auth
  requests.cookies
  requests.utils

  numpy
  np
  array
  asarray
  arange
  linspace
  logspace
  zeros
  ones
  full
  eye
  identity
  empty
  empty_like
  zeros_like
  ones_like
  full_like
  reshape
  resize
  concatenate
  stack
  vstack
  hstack
  split
  array_split
  tile
  repeat
  transpose
  swapaxes
  moveaxis
  squeeze
  expand_dims
  where
  nonzero
  argmax
  argmin
  argsort
  searchsorted
  unique
  sum
  prod
  mean
  median
  std
  var
  min
  max
  abs
  sqrt
  exp
  log
  sin
  cos
  tan
  dot
  matmul
  linalg
  random
  ndarray
  dtype

  pandas
  DataFrame
  Series
  Index
  MultiIndex
  read_csv
  read_excel
  read_json
  read_sql
  read_parquet
  read_pickle
  to_datetime
  concat
  merge
  join
  pivot
  pivot_table
  melt
  groupby
  agg
  aggregate
  apply
  transform
  map
  assign
  query
  loc
  iloc
  at
  iat
  head
  tail
  drop
  dropna
  fillna
  isna
  notna
  astype
  sort_values
  sort_index
  value_counts
  unique
  nunique
  duplicated
  rename
  replace
  reset_index
  set_index
  to_numpy
  to_dict
  to_csv
  to_json
  to_excel
  to_sql

  matplotlib
  pyplot
  plt
  figure
  subplots
  plot
  scatter
  bar
  barh
  hist
  pie
  boxplot
  violinplot
  imshow
  contour
  contourf
  xlabel
  ylabel
  title
  legend
  grid
  xlim
  ylim
  xticks
  yticks
  xscale
  yscale
  savefig
  show
  close
  tight_layout
  subplot
  colorbar
  annotate

  pytest
  fixture
  mark
  parametrize
  raises
  approx
  monkeypatch
  capsys
  caplog
  tmp_path
  tmpdir

  pydantic
  BaseModel
  Field
  ValidationError
  field_validator
  model_validator
  computed_field
  ConfigDict

  sqlalchemy
  create_engine
  select
  insert
  update
  delete
  Session
  sessionmaker
  declarative_base
  mapped_column
  relationship
  ForeignKey
  String
  Integer
  Boolean
  DateTime
  Text
  Float
  Numeric

  dotenv
  load_dotenv
  find_dotenv
  dotenv_values

  yaml
  safe_load
  safe_dump
  load
  dump
  full_load
  safe_load_all
  safe_dump_all

  tomllib
  load
  loads

  logging
  traceback
  pathlib
  asyncio
  threading
  multiprocessing
  subprocess
  socket
  requests
  flask
  fastapi
  django
  numpy
  pandas
  matplotlib
  pytest
  pydantic
  sqlalchemy

  __future__
  annotations
  division
  generators
  generator_stop
  unicode_literals
`.split(/\s+/),

    java: `
  abstract assert boolean break byte case catch char class const continue default
  do double else enum extends final finally float for goto if implements import
  instanceof int interface long native new package private protected public return
  short static strictfp super switch synchronized this throw throws transient
  try void volatile while

  var record sealed permits non-sealed yield
  when
  true false null

  Object Class String StringBuilder StringBuffer StringJoiner
  CharSequence Comparable Comparator Cloneable Iterable Iterator

  Byte Short Integer Long Float Double Boolean Character
  Number BigInteger BigDecimal AtomicInteger AtomicLong AtomicBoolean
  Void Math StrictMath

  Exception RuntimeException Throwable Error
  AssertionError
  LinkageError
  VirtualMachineError
  ThreadDeath
  StackOverflowError
  OutOfMemoryError

  NullPointerException
  IllegalArgumentException
  IllegalStateException
  IllegalAccessException
  IllegalCallerException
  UnsupportedOperationException
  SecurityException
  ArithmeticException
  ArrayIndexOutOfBoundsException
  IndexOutOfBoundsException
  StringIndexOutOfBoundsException
  NumberFormatException
  ClassCastException
  EnumConstantNotPresentException
  NegativeArraySizeException
  NoClassDefFoundError
  ClassNotFoundException
  NoSuchFieldException
  NoSuchMethodException
  InstantiationException
  InvocationTargetException
  IOException
  EOFException
  FileNotFoundException
  InterruptedIOException
  SocketException
  UnknownHostException
  TimeoutException
  ExecutionException
  CompletionException
  CancellationException

  System
  System.out
  System.err
  System.in
  System.arraycopy
  System.currentTimeMillis
  System.nanoTime
  System.getenv
  System.getProperty
  System.setProperty
  System.clearProperty
  System.getProperties
  System.exit
  System.gc
  System.identityHashCode
  System.lineSeparator
  System.console
  System.inheritedChannel
  System.Logger
  System.getLogger

  Runtime
  Runtime.getRuntime
  Runtime.availableProcessors
  Runtime.freeMemory
  Runtime.totalMemory
  Runtime.maxMemory
  Runtime.gc
  Runtime.exit
  Runtime.halt
  Runtime.exec
  Runtime.addShutdownHook
  Runtime.removeShutdownHook

  Math.abs
  Math.addExact
  Math.subtractExact
  Math.multiplyExact
  Math.incrementExact
  Math.decrementExact
  Math.negateExact
  Math.toIntExact
  Math.floorDiv
  Math.floorMod
  Math.ceilDiv
  Math.ceilMod
  Math.max
  Math.min
  Math.floor
  Math.ceil
  Math.rint
  Math.round
  Math.copySign
  Math.signum
  Math.nextAfter
  Math.nextUp
  Math.nextDown
  Math.scalb
  Math.getExponent
  Math.ulp
  Math.fma
  Math.sqrt
  Math.cbrt
  Math.hypot
  Math.pow
  Math.exp
  Math.expm1
  Math.log
  Math.log10
  Math.log1p
  Math.sin
  Math.cos
  Math.tan
  Math.asin
  Math.acos
  Math.atan
  Math.atan2
  Math.sinh
  Math.cosh
  Math.tanh
  Math.toDegrees
  Math.toRadians
  Math.random
  Math.PI
  Math.E
  Math.TAU

  StrictMath
  StrictMath.abs
  StrictMath.max
  StrictMath.min
  StrictMath.sqrt
  StrictMath.pow
  StrictMath.exp
  StrictMath.log
  StrictMath.sin
  StrictMath.cos
  StrictMath.tan

  Integer.parseInt
  Integer.parseUnsignedInt
  Integer.valueOf
  Integer.toString
  Integer.toUnsignedString
  Integer.toHexString
  Integer.toOctalString
  Integer.toBinaryString
  Integer.compare
  Integer.compareUnsigned
  Integer.divideUnsigned
  Integer.remainderUnsigned
  Integer.highestOneBit
  Integer.lowestOneBit
  Integer.numberOfLeadingZeros
  Integer.numberOfTrailingZeros
  Integer.bitCount
  Integer.reverse
  Integer.reverseBytes
  Integer.rotateLeft
  Integer.rotateRight
  Integer.signum
  Integer.sum
  Integer.max
  Integer.min
  Integer.MAX_VALUE
  Integer.MIN_VALUE

  Long.parseLong
  Long.parseUnsignedLong
  Long.valueOf
  Long.toString
  Long.toUnsignedString
  Long.toHexString
  Long.toOctalString
  Long.toBinaryString
  Long.compare
  Long.compareUnsigned
  Long.divideUnsigned
  Long.remainderUnsigned
  Long.highestOneBit
  Long.lowestOneBit
  Long.numberOfLeadingZeros
  Long.numberOfTrailingZeros
  Long.bitCount
  Long.reverse
  Long.reverseBytes
  Long.rotateLeft
  Long.rotateRight
  Long.signum
  Long.sum
  Long.max
  Long.min
  Long.MAX_VALUE
  Long.MIN_VALUE

  Double.parseDouble
  Double.valueOf
  Double.toString
  Double.toHexString
  Double.isNaN
  Double.isInfinite
  Double.isFinite
  Double.isInfinite
  Double.compare
  Double.sum
  Double.max
  Double.min
  Double.doubleToLongBits
  Double.doubleToRawLongBits
  Double.longBitsToDouble
  Double.MAX_VALUE
  Double.MIN_VALUE
  Double.POSITIVE_INFINITY
  Double.NEGATIVE_INFINITY
  Double.NaN

  Float.parseFloat
  Float.valueOf
  Float.toString
  Float.toHexString
  Float.isNaN
  Float.isInfinite
  Float.isFinite
  Float.compare
  Float.sum
  Float.max
  Float.min
  Float.floatToIntBits
  Float.floatToRawIntBits
  Float.intBitsToFloat
  Float.MAX_VALUE
  Float.MIN_VALUE
  Float.POSITIVE_INFINITY
  Float.NEGATIVE_INFINITY
  Float.NaN

  Boolean.parseBoolean
  Boolean.valueOf
  Boolean.toString
  Boolean.compare
  Boolean.logicalAnd
  Boolean.logicalOr
  Boolean.logicalXor

  Character.isLetter
  Character.isDigit
  Character.isLetterOrDigit
  Character.isWhitespace
  Character.isSpaceChar
  Character.isUpperCase
  Character.isLowerCase
  Character.isTitleCase
  Character.isAlphabetic
  Character.isIdeographic
  Character.isDefined
  Character.isJavaIdentifierStart
  Character.isJavaIdentifierPart
  Character.isUnicodeIdentifierStart
  Character.isUnicodeIdentifierPart
  Character.isISOControl
  Character.isMirrored
  Character.isSurrogate
  Character.isHighSurrogate
  Character.isLowSurrogate
  Character.toUpperCase
  Character.toLowerCase
  Character.toTitleCase
  Character.digit
  Character.getNumericValue
  Character.getType
  Character.getDirectionality
  Character.toCodePoint
  Character.charCount
  Character.codePointAt
  Character.codePointBefore
  Character.codePointCount
  Character.offsetByCodePoints

  String.valueOf
  String.copyValueOf
  String.format
  String.join
  String.repeat
  String.matches
  String.regionMatches
  String.startsWith
  String.endsWith
  String.contains
  String.indexOf
  String.lastIndexOf
  String.substring
  String.subSequence
  String.charAt
  String.codePointAt
  String.codePointBefore
  String.codePointCount
  String.offsetByCodePoints
  String.getChars
  String.getBytes
  String.toCharArray
  String.isEmpty
  String.isBlank
  String.lines
  String.strip
  String.stripLeading
  String.stripTrailing
  String.trim
  String.stripIndent
  String.translateEscapes
  String.indent
  String.concat
  String.replace
  String.replaceFirst
  String.replaceAll
  String.replace
  String.split
  String.splitWithDelimiters
  String.splitLines
  String.toLowerCase
  String.toUpperCase
  String.intern
  String.hashCode
  String.compareTo
  String.compareToIgnoreCase
  String.equals
  String.equalsIgnoreCase
  String.contentEquals
  String.regionMatches
  String.codePoints
  String.chars
  String.transform
  String.formatted
  String.translateEscapes

  StringBuilder
  StringBuffer
  append
  appendCodePoint
  insert
  delete
  deleteCharAt
  replace
  reverse
  setCharAt
  setLength
  capacity
  ensureCapacity
  trimToSize
  substring
  subSequence
  chars
  codePoints
  indexOf
  lastIndexOf
  charAt
  getChars
  toString

  StringJoiner
  add
  merge
  length
  setEmptyValue
  setEmptyValue

  Arrays
  Arrays.asList
  Arrays.copyOf
  Arrays.copyOfRange
  Arrays.fill
  Arrays.equals
  Arrays.deepEquals
  Arrays.deepHashCode
  Arrays.deepToString
  Arrays.hashCode
  Arrays.sort
  Arrays.parallelSort
  Arrays.binarySearch
  Arrays.mismatch
  Arrays.compare
  Arrays.compareUnsigned
  Arrays.toString
  Arrays.stream
  Arrays.spliterator
  Arrays.setAll
  Arrays.parallelSetAll
  Arrays.parallelPrefix

  Collections
  Collections.sort
  Collections.reverse
  Collections.shuffle
  Collections.swap
  Collections.fill
  Collections.copy
  Collections.min
  Collections.max
  Collections.frequency
  Collections.disjoint
  Collections.binarySearch
  Collections.rotate
  Collections.replaceAll
  Collections.indexOfSubList
  Collections.lastIndexOfSubList
  Collections.unmodifiableList
  Collections.unmodifiableSet
  Collections.unmodifiableMap
  Collections.unmodifiableCollection
  Collections.synchronizedList
  Collections.synchronizedSet
  Collections.synchronizedMap
  Collections.emptyList
  Collections.emptySet
  Collections.emptyMap
  Collections.singleton
  Collections.singletonList
  Collections.singletonMap
  Collections.nCopies
  Collections.checkedList
  Collections.checkedSet
  Collections.checkedMap

  List
  ArrayList
  LinkedList
  CopyOnWriteArrayList
  AbstractList
  AbstractSequentialList

  Set
  HashSet
  LinkedHashSet
  TreeSet
  EnumSet
  CopyOnWriteArraySet

  Map
  HashMap
  LinkedHashMap
  TreeMap
  Hashtable
  WeakHashMap
  IdentityHashMap
  EnumMap
  ConcurrentHashMap

  Queue
  Deque
  ArrayDeque
  PriorityQueue
  BlockingQueue
  ArrayBlockingQueue
  LinkedBlockingQueue
  PriorityBlockingQueue
  DelayQueue
  SynchronousQueue
  TransferQueue
  LinkedTransferQueue

  Stack
  Vector

  ConcurrentMap
  ConcurrentNavigableMap

  Collection
  Collections
  Iterable
  Iterator
  ListIterator
  Spliterator
  Enumeration

  add
  addAll
  remove
  removeIf
  retainAll
  removeAll
  contains
  containsAll
  clear
  size
  isEmpty
  toArray
  iterator
  listIterator
  subList
  sort
  replaceAll
  forEach

  Map.Entry
  entrySet
  keySet
  values
  put
  putAll
  putIfAbsent
  get
  getOrDefault
  containsKey
  containsValue
  remove
  replace
  replaceAll
  replace
  compute
  computeIfAbsent
  computeIfPresent
  merge

  Queue.offer
  Queue.poll
  Queue.peek
  Queue.element
  Queue.remove

  Deque.addFirst
  Deque.addLast
  Deque.offerFirst
  Deque.offerLast
  Deque.removeFirst
  Deque.removeLast
  Deque.pollFirst
  Deque.pollLast
  Deque.getFirst
  Deque.getLast
  Deque.peekFirst
  Deque.peekLast
  Deque.push
  Deque.pop

  Stack.push
  Stack.pop
  Stack.peek
  Stack.empty
  Stack.search

  Optional
  OptionalInt
  OptionalLong
  OptionalDouble
  Optional.empty
  Optional.of
  Optional.ofNullable
  Optional.isPresent
  Optional.isEmpty
  Optional.get
  Optional.orElse
  Optional.orElseGet
  Optional.orElseThrow
  Optional.ifPresent
  Optional.ifPresentOrElse
  Optional.filter
  Optional.map
  Optional.flatMap
  Optional.stream
  Optional.or

  Stream
  IntStream
  LongStream
  DoubleStream
  BaseStream

  stream
  parallelStream
  of
  iterate
  generate
  concat
  builder
  empty

  filter
  map
  mapToInt
  mapToLong
  mapToDouble
  flatMap
  flatMapToInt
  flatMapToLong
  flatMapToDouble
  distinct
  sorted
  peek
  limit
  skip
  takeWhile
  dropWhile
  sequential
  parallel
  unordered
  onClose

  forEach
  forEachOrdered
  toArray
  reduce
  collect
  min
  max
  count
  anyMatch
  allMatch
  noneMatch
  findFirst
  findAny

  Collectors
  toList
  toUnmodifiableList
  toSet
  toUnmodifiableSet
  toMap
  toConcurrentMap
  joining
  mapping
  filtering
  flatMapping
  collectingAndThen
  counting
  minBy
  maxBy
  summingInt
  summingLong
  summingDouble
  averagingInt
  averagingLong
  averagingDouble
  summarizingInt
  summarizingLong
  summarizingDouble
  reducing
  groupingBy
  groupingByConcurrent
  partitioningBy
  teeing

  IntSummaryStatistics
  LongSummaryStatistics
  DoubleSummaryStatistics
  IntUnaryOperator
  LongUnaryOperator
  DoubleUnaryOperator
  IntFunction
  LongFunction
  DoubleFunction
  IntPredicate
  LongPredicate
  DoublePredicate
  IntConsumer
  LongConsumer
  DoubleConsumer
  IntSupplier
  LongSupplier
  DoubleSupplier
  IntBinaryOperator
  LongBinaryOperator
  DoubleBinaryOperator
  BiFunction
  BiConsumer
  BiPredicate
  BinaryOperator
  Consumer
  Supplier
  Function
  Predicate
  UnaryOperator

  Comparator
  Comparator.comparing
  Comparator.comparingInt
  Comparator.comparingLong
  Comparator.comparingDouble
  Comparator.naturalOrder
  Comparator.reverseOrder
  Comparator.nullsFirst
  Comparator.nullsLast
  Comparator.thenComparing
  Comparator.reversed
  Comparator.reverse

  Objects
  Objects.equals
  Objects.deepEquals
  Objects.hashCode
  Objects.hash
  Objects.toString
  Objects.requireNonNull
  Objects.isNull
  Objects.nonNull
  Objects.checkIndex
  Objects.checkFromToIndex
  Objects.checkFromIndexSize

  System.Logger
  Logger
  log
  logp
  logrb
  trace
  debug
  info
  warning
  error

  Thread
  Thread.State
  ThreadGroup
  Runnable
  Callable
  Future
  FutureTask
  Executor
  ExecutorService
  ScheduledExecutorService
  Executors
  ExecutorCompletionService
  ThreadFactory
  ForkJoinPool
  ForkJoinTask
  RecursiveAction
  RecursiveTask
  CountDownLatch
  CyclicBarrier
  Phaser
  Semaphore
  Exchanger
  AtomicInteger
  AtomicLong
  AtomicBoolean
  AtomicReference
  AtomicIntegerArray
  AtomicLongArray
  AtomicReferenceArray
  AtomicStampedReference
  AtomicMarkableReference
  LongAdder
  LongAccumulator
  DoubleAdder
  DoubleAccumulator

  Thread.start
  Thread.run
  Thread.join
  Thread.sleep
  Thread.interrupt
  Thread.isInterrupted
  Thread.interrupted
  Thread.currentThread
  Thread.getName
  Thread.setName
  Thread.getId
  Thread.getPriority
  Thread.setPriority
  Thread.isAlive
  Thread.isDaemon
  Thread.setDaemon
  Thread.getState
  Thread.getThreadGroup
  Thread.getStackTrace
  Thread.setUncaughtExceptionHandler

  synchronized
  wait
  notify
  notifyAll

  Executors.newFixedThreadPool
  Executors.newCachedThreadPool
  Executors.newSingleThreadExecutor
  Executors.newScheduledThreadPool
  Executors.newWorkStealingPool
  Executors.newVirtualThreadPerTaskExecutor

  ExecutorService.submit
  ExecutorService.execute
  ExecutorService.shutdown
  ExecutorService.shutdownNow
  ExecutorService.awaitTermination
  ExecutorService.invokeAll
  ExecutorService.invokeAny
  isShutdown
  isTerminated

  Future.get
  Future.get
  Future.isDone
  Future.isCancelled
  Future.cancel

  TimeUnit
  NANOSECONDS
  MICROSECONDS
  MILLISECONDS
  SECONDS
  MINUTES
  HOURS
  DAYS
  TimeUnit.convert
  TimeUnit.sleep
  TimeUnit.toNanos
  TimeUnit.toMicros
  TimeUnit.toMillis
  TimeUnit.toSeconds

  AtomicInteger.get
  AtomicInteger.set
  AtomicInteger.lazySet
  AtomicInteger.getAndSet
  AtomicInteger.compareAndSet
  AtomicInteger.getAndIncrement
  AtomicInteger.incrementAndGet
  AtomicInteger.getAndDecrement
  AtomicInteger.decrementAndGet
  AtomicInteger.getAndAdd
  AtomicInteger.addAndGet
  AtomicInteger.updateAndGet
  AtomicInteger.accumulateAndGet

  ReentrantLock
  ReentrantReadWriteLock
  ReadWriteLock
  StampedLock
  Lock
  Condition
  lock
  lockInterruptibly
  tryLock
  unlock
  newCondition
  readLock
  writeLock

  Files
  Paths
  Path
  FileSystem
  FileSystems
  FileStore
  DirectoryStream
  WatchService
  WatchKey
  WatchEvent
  StandardWatchEventKinds

  Files.exists
  Files.notExists
  Files.isRegularFile
  Files.isDirectory
  Files.isSymbolicLink
  Files.isReadable
  Files.isWritable
  Files.isExecutable
  Files.size
  Files.getLastModifiedTime
  Files.getOwner
  Files.getAttribute
  Files.readAttributes
  Files.setAttribute

  Files.createFile
  Files.createDirectory
  Files.createDirectories
  Files.createTempFile
  Files.createTempDirectory
  Files.delete
  Files.deleteIfExists
  Files.copy
  Files.move
  Files.createLink
  Files.createSymbolicLink
  Files.readSymbolicLink

  Files.readAllBytes
  Files.readAllLines
  Files.readString
  Files.write
  Files.writeString

  Files.newInputStream
  Files.newOutputStream
  Files.newBufferedReader
  Files.newBufferedWriter
  Files.lines
  Files.list
  Files.walk
  Files.find
  Files.walkFileTree

  StandardOpenOption
  CREATE
  CREATE_NEW
  APPEND
  TRUNCATE_EXISTING
  READ
  WRITE
  DELETE_ON_CLOSE
  DSYNC
  SYNC

  File
  FileInputStream
  FileOutputStream
  FileReader
  FileWriter
  BufferedInputStream
  BufferedOutputStream
  BufferedReader
  BufferedWriter
  InputStream
  OutputStream
  InputStreamReader
  OutputStreamWriter
  PrintStream
  PrintWriter
  Reader
  Writer
  FilterInputStream
  FilterOutputStream
  DataInputStream
  DataOutputStream
  ObjectInputStream
  ObjectOutputStream
  SequenceInputStream

  File.separator
  File.pathSeparator
  File.separatorChar
  File.pathSeparatorChar
  File.exists
  File.isFile
  File.isDirectory
  File.isHidden
  File.length
  File.lastModified
  File.canRead
  File.canWrite
  File.canExecute
  File.mkdir
  File.mkdirs
  File.createNewFile
  File.delete
  File.renameTo
  File.list
  File.listFiles
  File.getName
  File.getParent
  File.getParentFile
  File.getPath
  File.getAbsolutePath
  File.getCanonicalPath
  File.toURI

  Scanner
  Scanner.next
  Scanner.nextLine
  Scanner.nextInt
  Scanner.nextLong
  Scanner.nextDouble
  Scanner.hasNext
  Scanner.hasNextLine
  Scanner.hasNextInt
  Scanner.hasNextLong
  Scanner.hasNextDouble
  Scanner.useDelimiter
  Scanner.useLocale
  Scanner.skip

  Formatter
  Formatter.format
  Formatter.locale
  Formatter.close

  Pattern
  Matcher
  Pattern.compile
  Pattern.matches
  Matcher.matches
  Matcher.find
  Matcher.group
  Matcher.groupCount
  Matcher.start
  Matcher.end
  Matcher.start
  Matcher.reset
  Matcher.replaceAll
  Matcher.replaceFirst
  Matcher.appendReplacement
  Matcher.appendTail
  Pattern.CASE_INSENSITIVE
  Pattern.MULTILINE
  Pattern.DOTALL
  Pattern.UNIX_LINES
  Pattern.COMMENTS
  Pattern.UNICODE_CASE
  Pattern.CANON_EQ
  Pattern.LITERAL
  Pattern.UNICODE_CHARACTER_CLASS

  LocalDate
  LocalTime
  LocalDateTime
  ZonedDateTime
  OffsetDateTime
  OffsetTime
  Instant
  Duration
  Period
  ZoneId
  ZoneOffset
  ZoneRules
  Month
  DayOfWeek
  Year
  YearMonth
  MonthDay

  LocalDate.now
  LocalDate.of
  LocalDate.parse
  LocalDate.from
  LocalDate.plusDays
  LocalDate.plusWeeks
  LocalDate.plusMonths
  LocalDate.plusYears
  LocalDate.minusDays
  LocalDate.minusWeeks
  LocalDate.minusMonths
  LocalDate.minusYears
  LocalDate.with
  LocalDate.getYear
  LocalDate.getMonth
  LocalDate.getMonthValue
  LocalDate.getDayOfMonth
  LocalDate.getDayOfYear
  LocalDate.getDayOfWeek
  LocalDate.lengthOfMonth
  LocalDate.lengthOfYear
  LocalDate.isLeapYear
  LocalDate.isBefore
  LocalDate.isAfter
  LocalDate.isEqual

  DateTimeFormatter
  ISO_LOCAL_DATE
  ISO_LOCAL_DATE_TIME
  ISO_OFFSET_DATE_TIME
  ISO_ZONED_DATE_TIME
  ISO_INSTANT
  ofPattern
  format
  parse

  Instant.now
  Instant.ofEpochSecond
  Instant.ofEpochMilli
  Instant.toEpochMilli
  Instant.getEpochSecond
  Instant.plus
  Instant.minus
  Instant.isBefore
  Instant.isAfter

  Duration.ofDays
  Duration.ofHours
  Duration.ofMinutes
  Duration.ofSeconds
  Duration.ofMillis
  Duration.ofNanos
  Duration.between
  Duration.toDays
  Duration.toHours
  Duration.toMinutes
  Duration.toSeconds
  Duration.toMillis
  Duration.toNanos

  Period.ofDays
  Period.ofWeeks
  Period.ofMonths
  Period.ofYears
  Period.between

  ZoneId.of
  ZoneId.getAvailableZoneIds
  ZoneId.systemDefault
  ZoneOffset.UTC

  UUID
  UUID.randomUUID
  UUID.fromString
  UUID.nameUUIDFromBytes
  UUID.fromString

  Base64
  Base64.getEncoder
  Base64.getDecoder
  Base64.getUrlEncoder
  Base64.getUrlDecoder
  Base64.getMimeEncoder
  Base64.getMimeDecoder
  encode
  encodeToString
  decode

  MessageDigest
  MessageDigest.getInstance
  MessageDigest.update
  MessageDigest.digest
  MessageDigest.reset
  MD5
  SHA-1
  SHA-256
  SHA-384
  SHA-512

  SecureRandom
  SecureRandom.nextInt
  SecureRandom.nextLong
  SecureRandom.nextBytes
  SecureRandom.generateSeed

  Charset
  StandardCharsets
  UTF_8
  UTF_16
  UTF_16BE
  UTF_16LE
  ISO_8859_1
  US_ASCII

  ByteBuffer
  ByteOrder
  Buffer
  CharBuffer
  IntBuffer
  LongBuffer
  DoubleBuffer
  FloatBuffer
  ShortBuffer

  ByteBuffer.allocate
  ByteBuffer.allocateDirect
  ByteBuffer.wrap
  ByteBuffer.put
  ByteBuffer.get
  ByteBuffer.flip
  ByteBuffer.clear
  ByteBuffer.rewind
  ByteBuffer.mark
  ByteBuffer.reset
  ByteBuffer.position
  ByteBuffer.limit
  ByteBuffer.remaining
  ByteBuffer.hasRemaining
  ByteBuffer.array
  ByteBuffer.slice
  ByteBuffer.duplicate
  ByteBuffer.order

  HttpClient
  HttpRequest
  HttpResponse
  HttpHeaders
  HttpHandler
  HttpServer
  HttpRequest.Builder
  HttpResponse.BodyHandlers
  HttpResponse.BodySubscribers
  HttpRequest.BodyPublishers

  HttpClient.newHttpClient
  HttpClient.newBuilder
  HttpClient.send
  HttpClient.sendAsync
  HttpClient.version
  HttpClient.followRedirects

  HttpRequest.newBuilder
  HttpRequest.uri
  HttpRequest.header
  HttpRequest.headers
  HttpRequest.timeout
  HttpRequest.GET
  HttpRequest.POST
  HttpRequest.PUT
  HttpRequest.method

  URI
  URL
  URLConnection
  HttpURLConnection
  InetAddress
  InetSocketAddress
  Socket
  ServerSocket
  DatagramSocket
  DatagramPacket

  InetAddress.getByName
  InetAddress.getAllByName
  InetAddress.getLocalHost
  InetAddress.getLoopbackAddress
  InetAddress.getHostName
  InetAddress.getHostAddress
  InetAddress.isReachable

  Socket.connect
  Socket.bind
  Socket.close
  Socket.getInputStream
  Socket.getOutputStream
  Socket.setSoTimeout
  Socket.setTcpNoDelay
  Socket.setReuseAddress
  Socket.setKeepAlive

  ServerSocket.bind
  ServerSocket.accept
  ServerSocket.close
  ServerSocket.setSoTimeout

  URI.create
  URI.parseServerAuthority
  URI.getScheme
  URI.getHost
  URI.getPort
  URI.getPath
  URI.getQuery
  URI.getFragment
  URI.getRawPath
  URI.getRawQuery

  Process
  ProcessBuilder
  ProcessHandle
  ProcessBuilder.start
  Process.waitFor
  Process.exitValue
  Process.isAlive
  Process.destroy
  Process.destroyForcibly
  Process.inputReader
  Process.errorReader
  Process.outputWriter

  ProcessHandle.current
  ProcessHandle.allProcesses
  ProcessHandle.of
  ProcessHandle.pid
  ProcessHandle.parent
  ProcessHandle.children
  ProcessHandle.descendants
  ProcessHandle.info
  ProcessHandle.onExit
  ProcessHandle.destroy
  ProcessHandle.destroyForcibly

  Json
  JsonObject
  JsonArray
  JsonValue
  JsonReader
  JsonWriter

  XML
  DOM
  Document
  Element
  Node
  NodeList
  NodeList
  SAXParser
  SAXParserFactory
  DocumentBuilder
  DocumentBuilderFactory
  XPath
  XPathFactory

  ObjectInputStream
  ObjectOutputStream
  Serializable
  Externalizable
  serialVersionUID

  Reflection
  Class.forName
  getClass
  getName
  getSimpleName
  getCanonicalName
  getPackageName
  getSuperclass
  getInterfaces
  getDeclaredFields
  getFields
  getDeclaredMethods
  getMethods
  getDeclaredConstructors
  getConstructors
  getDeclaredClasses
  getClasses
  getDeclaredAnnotations
  getAnnotations
  getAnnotation
  getModifiers
  isInterface
  isEnum
  isArray
  isPrimitive
  isRecord
  isSealed
  isAssignableFrom
  isInstance
  cast

  Field
  Method
  Constructor
  Parameter
  Modifier
  InvocationTargetException
  AccessibleObject
  setAccessible
  canAccess
  trySetAccessible
  invoke
  newInstance
  get
  set
  getInt
  getLong
  getDouble
  getBoolean
  getObject

  Annotation
  Retention
  Target
  Documented
  Inherited
  Repeatable
  Override
  Deprecated
  SuppressWarnings
  SafeVarargs
  FunctionalInterface

  RetentionPolicy
  SOURCE
  CLASS
  RUNTIME

  ElementType
  TYPE
  FIELD
  METHOD
  PARAMETER
  CONSTRUCTOR
  LOCAL_VARIABLE
  ANNOTATION_TYPE
  PACKAGE
  TYPE_PARAMETER
  TYPE_USE
  MODULE
  RECORD_COMPONENT

  MethodHandles
  MethodHandle
  MethodType
  VarHandle
  Lookup
  MethodHandles.Lookup
  invokeExact
  invoke
  invokeWithArguments
  asType
  bindTo
  insertArguments
  filterArguments
  filterReturnValue

  Module
  ModuleLayer
  ModuleDescriptor
  ModuleReference
  ModuleFinder
  ModuleReader
  requires
  exports
  opens
  uses
  provides
  to
  with
  open

  java
  javax
  jakarta
  com
  org

  annotation
  beans
  io
  lang
  math
  net
  nio
  security
  sql
  text
  time
  util
  xml

  java.util.function
  java.util.stream
  java.util.concurrent
  java.util.concurrent.atomic
  java.util.concurrent.locks
  java.util.concurrent.locks.Condition
  java.util.concurrent.locks.Lock
  java.util.concurrent.locks.ReadWriteLock

  java.util.regex
  java.util.random
  java.util.zip
  java.util.jar
  java.util.jar.JarFile
  java.util.jar.JarEntry
  java.util.jar.Manifest

  ZipFile
  ZipEntry
  ZipOutputStream
  ZipInputStream
  GZIPInputStream
  GZIPOutputStream
  Deflater
  Inflater

  JarFile
  JarEntry
  Manifest
  Attributes
  CodeSource
  ProtectionDomain

  Properties
  ResourceBundle
  Locale
  Currency
  Collator
  Formatter
  Scanner
  Objects
  Optional

  ResourceBundle.getBundle
  Properties.load
  Properties.store
  Properties.getProperty
  Properties.setProperty
  Properties.stringPropertyNames

  Locale.US
  Locale.UK
  Locale.FRANCE
  Locale.GERMANY
  Locale.ROOT
  Locale.getDefault
  Locale.setDefault
  Locale.of
  Locale.forLanguageTag
  Locale.toLanguageTag

  BigInteger.add
  BigInteger.subtract
  BigInteger.multiply
  BigInteger.divide
  BigInteger.divideAndRemainder
  BigInteger.mod
  BigInteger.pow
  BigInteger.gcd
  BigInteger.abs
  BigInteger.negate
  BigInteger.signum
  BigInteger.compareTo
  BigInteger.intValue
  BigInteger.longValue
  BigInteger.doubleValue
  BigInteger.toString

  BigDecimal.add
  BigDecimal.subtract
  BigDecimal.multiply
  BigDecimal.divide
  BigDecimal.remainder
  BigDecimal.pow
  BigDecimal.abs
  BigDecimal.negate
  BigDecimal.setScale
  BigDecimal.round
  BigDecimal.precision
  BigDecimal.scale
  BigDecimal.stripTrailingZeros
  BigDecimal.toBigInteger
  BigDecimal.intValue
  BigDecimal.longValue
  BigDecimal.doubleValue
  BigDecimal.toPlainString
  BigDecimal.toEngineeringString

  RoundingMode
  HALF_UP
  HALF_DOWN
  HALF_EVEN
  UP
  DOWN
  CEILING
  FLOOR
  UNNECESSARY

  ClassLoader
  getSystemClassLoader
  getPlatformClassLoader
  loadClass
  defineClass
  findClass
  getResource
  getResourceAsStream

  SecurityManager
  AccessController
  PrivilegedAction
  PrivilegedExceptionAction
  ProtectionDomain
  Permission
  FilePermission
  RuntimePermission

  Locale
  ResourceBundle
  ResourceBundle.Control

  Formatter
  Formattable
  FormattableFlags

  Pattern
  Matcher

  javax.swing
  JFrame
  JPanel
  JLabel
  JButton
  JTextField
  JTextArea
  JList
  JTable
  JScrollPane
  JMenuBar
  JMenu
  JMenuItem
  JOptionPane
  JPanel
  BorderLayout
  FlowLayout
  GridLayout
  GridBagLayout
  SwingUtilities
  EventQueue

  javafx
  Application
  Stage
  Scene
  Node
  Parent
  Pane
  VBox
  HBox
  StackPane
  BorderPane
  GridPane
  Label
  Button
  TextField
  TextArea
  ListView
  TableView
  ComboBox
  CheckBox
  RadioButton
  MenuBar
  Menu
  MenuItem
  Alert
  FileChooser
  FXMLLoader
  ObservableList
  FXCollections
  Property
  ObjectProperty
  StringProperty
  BooleanProperty
  IntegerProperty
  DoubleProperty
  Bindings

  JUnit
  Test
  BeforeEach
  AfterEach
  BeforeAll
  AfterAll
  BeforeClass
  AfterClass
  TestFactory
  TestInstance
  ParameterizedTest
  ValueSource
  CsvSource
  MethodSource
  Arguments
  assertEquals
  assertNotEquals
  assertTrue
  assertFalse
  assertNull
  assertNotNull
  assertSame
  assertNotSame
  assertThrows
  assertDoesNotThrow
  assertTimeout
  assertTimeoutPreemptively

  Maven
  Gradle
  pom
  artifact
  dependency
  plugin
  repository
  groupId
  artifactId
  version
  scope
  compile
  test
  runtime
  provided
  implementation
  api
  compileOnly
  runtimeOnly
  testImplementation
  testRuntimeOnly

  JVM
  JDK
  JRE
  javac
  java
  jar
  javadoc
  jshell
  jlink
  jpackage
  jdeps
  javap
  serialver

  gc
  hotspot
  classpath
  modulepath
  classloader
  bytecode
  heap
  stack
  garbage
  virtual
  native
  synchronized
  lock
  monitor
`.split(/\s+/),

    cpp: `
  alignas alignof and and_eq asm auto bitand bitor bool break case catch
  char char8_t char16_t char32_t class compl concept const constexpr
  consteval constinit const_cast continue co_await co_return co_yield
  decltype default delete do double dynamic_cast else enum explicit export
  extern false float for friend goto if inline int long mutable namespace
  new noexcept not not_eq nullptr operator or or_eq private protected public
  register reinterpret_cast requires return short signed sizeof static
  static_assert static_cast struct switch template this thread_local
  throw true try typedef typeid typename union unsigned using virtual void
  volatile wchar_t while xor xor_eq

  override final
  module import
  static_cast dynamic_cast const_cast reinterpret_cast
  noexcept

  std
  string wstring u8string u16string u32string
  string_view wstring_view u8string_view u16string_view u32string_view

  vector array deque list forward_list
  map multimap unordered_map
  set multiset unordered_set
  stack queue priority_queue
  pair tuple optional variant any
  bitset
  valarray
  span
  mdspan

  shared_ptr unique_ptr weak_ptr
  make_shared make_unique
  enable_shared_from_this
  allocator allocator_traits
  owner_less

  iterator reverse_iterator
  const_iterator const_reverse_iterator
  iterator_traits
  begin end cbegin cend
  rbegin rend crbegin crend
  next prev advance distance

  input_iterator output_iterator
  forward_iterator bidirectional_iterator
  random_access_iterator contiguous_iterator
  sentinel_for sized_sentinel_for
  ranges
  views
  common_view
  subrange
  ref_view
  iota_view
  filter_view
  transform_view
  take_view
  drop_view
  reverse_view
  split_view
  join_view
  lazy_split_view
  zip_view
  adjacent_view
  enumerate_view

  move move_if_noexcept forward
  swap exchange
  addressof
  as_const
  declval
  invoke
  invoke_result
  is_invocable
  is_invocable_r
  bind
  bind_front
  bind_back
  mem_fn
  reference_wrapper
  ref cref

  function
  plus minus multiplies divides modulus
  negate
  equal_to not_equal_to
  greater less
  greater_equal less_equal
  logical_and logical_or logical_not
  bit_and bit_or bit_xor bit_not
  bit_shift_left bit_shift_right
  identity

  sort stable_sort partial_sort
  nth_element
  lower_bound upper_bound
  equal_range
  binary_search
  merge inplace_merge
  includes
  set_union set_intersection
  set_difference set_symmetric_difference
  partition stable_partition
  partition_point
  is_partitioned
  find find_if find_if_not
  count count_if
  all_of any_of none_of
  for_each for_each_n
  transform
  replace replace_if
  fill fill_n
  generate generate_n
  remove remove_if
  remove_copy remove_copy_if
  unique
  reverse
  rotate
  shuffle
  sample
  min max minmax
  min_element max_element minmax_element
  clamp
  lexicographical_compare
  equal
  mismatch
  accumulate
  reduce
  inner_product
  adjacent_difference
  partial_sum
  exclusive_scan inclusive_scan
  transform_reduce
  transform_exclusive_scan
  transform_inclusive_scan

  ranges::sort
  ranges::find
  ranges::find_if
  ranges::filter
  ranges::transform
  ranges::for_each
  ranges::copy
  ranges::move
  ranges::reverse
  ranges::rotate
  ranges::unique
  ranges::fold_left
  ranges::fold_right

  cout cin cerr clog
  wcout wcin wcerr wclog
  endl ends flush
  istream ostream iostream
  ifstream ofstream fstream
  wistringstream wostringstream
  istringstream ostringstream stringstream
  streambuf filebuf stringbuf
  streamsize streamoff streampos
  ios ios_base
  basic_istream basic_ostream basic_iostream
  basic_ifstream basic_ofstream basic_fstream
  basic_string basic_string_view

  getline
  ignore
  peek
  putback
  unget
  get
  read
  readsome
  write
  put
  flush
  seekg seekp
  tellg tellp
  sync
  good bad fail eof
  clear
  rdstate
  setstate
  exceptions
  imbue
  locale

  ios::in
  ios::out
  ios::app
  ios::ate
  ios::trunc
  ios::binary

  exception
  runtime_error
  logic_error
  domain_error
  invalid_argument
  length_error
  out_of_range
  range_error
  overflow_error
  underflow_error
  system_error
  system_category
  generic_category
  error_code
  error_condition
  errc
  make_error_code
  make_error_condition
  current_exception
  make_exception_ptr
  rethrow_exception
  rethrow_if_nested
  nested_exception
  throw_with_nested
  terminate
  terminate_handler
  set_terminate
  get_terminate
  uncaught_exception
  uncaught_exceptions

  assert
  static_assert

  thread
  jthread
  this_thread
  get_id
  sleep_for
  sleep_until
  yield
  hardware_concurrency
  thread::id

  mutex
  recursive_mutex
  timed_mutex
  recursive_timed_mutex
  shared_mutex
  shared_timed_mutex
  unique_lock
  lock_guard
  scoped_lock
  shared_lock
  defer_lock
  try_to_lock
  adopt_lock
  lock
  try_lock
  call_once
  once_flag

  condition_variable
  condition_variable_any
  notify_one
  notify_all
  wait
  wait_for
  wait_until
  wait_predicate

  semaphore
  binary_semaphore
  counting_semaphore

  latch
  barrier
  atomic
  atomic_flag
  atomic_ref
  atomic_bool
  atomic_char
  atomic_int
  atomic_long
  atomic_llong
  atomic_uint
  atomic_ulong
  atomic_ullong
  atomic_thread_fence
  atomic_signal_fence
  memory_order
  memory_order_relaxed
  memory_order_consume
  memory_order_acquire
  memory_order_release
  memory_order_acq_rel
  memory_order_seq_cst

  future
  promise
  packaged_task
  async
  launch
  future_status
  future_error
  future_category
  shared_future
  make_ready_at_thread_exit
  promise_type

  coroutine
  coroutine_handle
  suspend_always
  suspend_never
  noop_coroutine
  await_ready
  await_suspend
  await_resume

  chrono
  duration
  time_point
  system_clock
  steady_clock
  high_resolution_clock
  year month day
  year_month_day
  hours minutes seconds milliseconds
  microseconds nanoseconds
  duration_cast
  time_point_cast
  floor ceil round
  now

  filesystem
  path
  directory_entry
  directory_iterator
  recursive_directory_iterator
  file_status
  space_info
  file_type
  perms
  copy_options
  directory_options
  file_time_type
  exists
  is_regular_file
  is_directory
  is_symlink
  is_block_file
  is_character_file
  is_fifo
  is_socket
  is_other
  status
  symlink_status
  absolute
  canonical
  weakly_canonical
  relative
  proximate
  current_path
  temp_directory_path
  create_directory
  create_directories
  remove
  remove_all
  rename
  copy
  copy_file
  copy_symlink
  create_symlink
  create_directory_symlink
  read_symlink
  resize_file
  file_size
  last_write_time
  permissions
  equivalent
  space

  cstdint
  int8_t int16_t int32_t int64_t
  uint8_t uint16_t uint32_t uint64_t
  int_least8_t int_least16_t int_least32_t int_least64_t
  uint_least8_t uint_least16_t uint_least32_t uint_least64_t
  int_fast8_t int_fast16_t int_fast32_t int_fast64_t
  uint_fast8_t uint_fast16_t uint_fast32_t uint_fast64_t
  intmax_t uintmax_t
  intptr_t uintptr_t

  limits
  numeric_limits
  max min lowest epsilon infinity quiet_NaN signaling_NaN
  digits digits10 max_digits10
  is_signed is_integer is_exact
  radix min_exponent max_exponent

  type_traits
  true_type false_type
  integral_constant
  enable_if enable_if_t
  conditional conditional_t
  decay decay_t
  remove_reference remove_reference_t
  add_reference add_reference_t
  remove_const remove_const_t
  remove_volatile remove_volatile_t
  remove_cv remove_cv_t
  add_const add_volatile add_cv
  is_same is_void
  is_null_pointer
  is_integral is_floating_point
  is_array is_enum is_union is_class
  is_function is_pointer
  is_lvalue_reference is_rvalue_reference
  is_member_object_pointer is_member_function_pointer
  is_trivial is_standard_layout
  is_pod is_empty is_polymorphic
  is_abstract is_final
  is_constructible is_default_constructible
  is_copy_constructible is_move_constructible
  is_assignable is_copy_assignable is_move_assignable
  is_destructible
  is_nothrow_constructible
  is_nothrow_default_constructible
  is_nothrow_copy_constructible
  is_nothrow_move_constructible
  is_nothrow_assignable
  is_nothrow_destructible
  is_convertible
  is_base_of
  is_invocable
  rank extent
  alignment_of
  has_virtual_destructor
  conjunction disjunction negation
  void_t
  common_type common_reference
  underlying_type
  make_signed make_unsigned
  conditional
  invoke_result
  result_of

  concepts
  same_as
  derived_from
  convertible_to
  common_reference_with
  common_with
  integral
  signed_integral
  unsigned_integral
  floating_point
  assignable_from
  destructible
  constructible_from
  default_initializable
  move_constructible
  copy_constructible
  movable
  copyable
  semiregular
  regular
  invocable
  predicate
  relation
  equivalence_relation
  strict_weak_order

  memory
  allocator
  allocator_traits
  uninitialized_copy
  uninitialized_move
  uninitialized_fill
  uninitialized_value_construct
  construct_at
  destroy_at
  destroy
  destroy_n
  align
  assume_aligned
  get_temporary_buffer
  return_temporary_buffer
  pointer_traits
  uses_allocator
  uses_allocator_construction_args
  allocate_shared
  allocate_at_least

  new
  delete
  new_handler
  set_new_handler
  get_new_handler
  bad_alloc
  bad_array_new_length

  cstdlib
  malloc
  calloc
  realloc
  free
  aligned_alloc
  abort
  exit
  quick_exit
  _Exit
  atexit
  at_quick_exit
  getenv
  system
  qsort
  bsearch
  div
  ldiv
  lldiv

  cstring
  memcpy
  memmove
  memset
  memcmp
  memchr
  strcpy
  strncpy
  strcat
  strncat
  strcmp
  strncmp
  strchr
  strrchr
  strstr
  strlen
  strerror
  strtok

  cctype
  isalnum isalpha isblank iscntrl isdigit isgraph
  islower isprint ispunct isspace isupper isxdigit
  tolower toupper

  cmath
  abs labs llabs
  fmod remainder remquo
  fma
  exp exp2 expm1
  log log10 log2 log1p
  pow sqrt cbrt hypot
  sin cos tan asin acos atan atan2
  sinh cosh tanh asinh acosh atanh
  erf erfc tgamma lgamma
  ceil floor trunc round lround llround
  nearbyint rint lrint llrint
  frexp ldexp modf
  isfinite isinf isnan isnormal
  signbit copysign

  random
  random_device
  mt19937 mt19937_64
  minstd_rand
  default_random_engine
  ranlux24 ranlux48
  seed_seq
  uniform_int_distribution
  uniform_real_distribution
  bernoulli_distribution
  binomial_distribution
  normal_distribution
  poisson_distribution
  exponential_distribution
  gamma_distribution
  weibull_distribution
  discrete_distribution
  piecewise_constant_distribution
  piecewise_linear_distribution

  regex
  basic_regex
  regex
  smatch
  cmatch
  wsmatch
  match_results
  regex_match
  regex_search
  regex_replace
  regex_iterator
  regex_token_iterator
  regex_constants
  icase
  nosubs
  optimize
  collate
  ECMAScript
  basic
  extended
  awk
  grep
  egrep

  format
  format_to
  formatted_size
  vformat
  format_string
  format_args

  print
  println

  source_location
  current
  file_name
  function_name
  line
  column

  expected
  unexpected
  unexpect
  bad_expected_access

  variant
  monostate
  get
  get_if
  holds_alternative
  visit
  visit_if

  optional
  nullopt
  nullopt_t
  make_optional
  has_value
  value
  value_or
  reset

  any
  make_any
  any_cast
  has_value
  type
  typeid

  tuple
  make_tuple
  tie
  forward_as_tuple
  tuple_cat
  get
  tuple_size
  tuple_element

  pair
  make_pair
  piecewise_construct
  piecewise_construct_t

  array
  get
  tuple_size
  tuple_element

  string_view
  starts_with
  ends_with
  contains
  substr
  find
  rfind
  compare
  remove_prefix
  remove_suffix

  bitset
  set
  reset
  flip
  test
  any
  all
  none
  count
  size
  to_string
  to_ulong
  to_ullong

  numeric
  gcd
  lcm
  midpoint
  byteswap
  iota

  execution
  sequenced_policy
  parallel_policy
  parallel_unsequenced_policy
  seq
  par
  par_unseq

  source
  stacktrace
  stacktrace_entry
  current
  to_string

  exception_ptr
  current_exception
  make_exception_ptr
  rethrow_exception

  typeid
  type_info
  bad_cast
  bad_typeid
  dynamic_cast

  coroutine
  generator
  coroutine_handle
  noop_coroutine
  suspend_always
  suspend_never

  ranges
  range
  view
  viewable_range
  borrowed_range
  common_range
  sized_range
  input_range
  output_range
  forward_range
  bidirectional_range
  random_access_range
  contiguous_range

  modules
  module
  import
  export

  pragma
  include
  define
  undef
  ifdef
  ifndef
  if
  elif
  else
  endif
  pragma
  once
  error
  warning
  line

  NULL
  nullptr
  true
  false

  main
  argc
  argv

  std::move
  std::forward
  std::initializer_list
  initializer_list

  std::byte
  byte
  to_integer

  std::numbers
  pi
  e
  log2e
  log10e
  ln2
  ln10
  sqrt2
  inv_sqrt3

  fmt
  spdlog
  boost
  asio
  beast
  openssl
  sqlite3
  curl
  nlohmann
  json
  SDL
  SDL3
  glfw
  bgfx
  imgui
  qt
  wxwidgets
  boost::asio
  boost::filesystem
  boost::thread
  boost::system
  boost::program_options
`.split(/\s+/),

    c: `
  auto break case char const continue default do double else enum extern float
  for goto if inline int long register restrict return short signed sizeof
  static struct switch typedef union unsigned void volatile while

  _Alignas _Alignof
  _Atomic
  _Bool
  _Complex
  _Generic
  _Imaginary
  _Noreturn
  _Static_assert
  _Thread_local

  bool true false
  NULL nullptr

  int8_t int16_t int32_t int64_t
  uint8_t uint16_t uint32_t uint64_t
  int_least8_t int_least16_t int_least32_t int_least64_t
  uint_least8_t uint_least16_t uint_least32_t uint_least64_t
  int_fast8_t int_fast16_t int_fast32_t int_fast64_t
  uint_fast8_t uint_fast16_t uint_fast32_t uint_fast64_t
  intmax_t uintmax_t
  intptr_t uintptr_t
  size_t ptrdiff_t
  max_align_t wchar_t wint_t
  wint_t

  va_list va_start va_arg va_copy va_end

  main
  argc argv

  printf fprintf sprintf snprintf
  vprintf vfprintf vsprintf vsnprintf

  scanf fscanf sscanf
  vscanf vfscanf vsscanf

  puts putchar getchar
  fputc fgetc
  putc getc
  ungetc

  perror strerror strerror_r

  fopen freopen fdopen
  fclose
  fflush
  fread fwrite
  fgetc fputc
  fgets fputs
  gets

  fseek ftell rewind
  fsetpos fgetpos
  clearerr feof ferror
  setbuf setvbuf
  tmpfile tmpnam
  rename remove

  stdin stdout stderr
  EOF
  BUFSIZ
  FOPEN_MAX
  FILENAME_MAX
  SEEK_SET SEEK_CUR SEEK_END

  malloc calloc realloc free
  aligned_alloc
  malloc_usable_size

  memcpy memmove memset memcmp
  memccpy memchr
  strlen strnlen
  strcmp strncmp strcasecmp strncasecmp
  strcpy strncpy
  strcat strncat
  strchr strrchr
  strstr strcasestr
  strtok strtok_r
  strspn strcspn strpbrk
  strerror strerror_r

  atoi atol atoll
  strtol strtoll
  strtoul strtoull
  strtoimax strtoumax
  strtof strtod strtold
  strfromd strfromf strfroml

  abs labs llabs
  div ldiv lldiv
  rand srand
  random srandom
  drand48 srand48
  arc4random

  qsort bsearch

  time clock difftime
  time_t clock_t
  timespec
  tm
  localtime localtime_r
  gmtime gmtime_r
  mktime
  asctime asctime_r
  ctime ctime_r
  strftime
  strptime
  nanosleep

  assert
  static_assert

  setlocale localeconv
  locale_t newlocale freelocale uselocale
  LC_ALL LC_COLLATE LC_CTYPE
  LC_MONETARY LC_NUMERIC LC_TIME
  LC_MESSAGES

  isalnum
  isalpha
  isblank
  iscntrl
  isdigit
  isgraph
  islower
  isprint
  ispunct
  isspace
  isupper
  isxdigit
  isascii
  tolower
  toupper

  iswalnum
  iswalpha
  iswblank
  iswcntrl
  iswdigit
  iswgraph
  iswlower
  iswprint
  iswpunct
  iswspace
  iswupper
  iswxdigit
  towlower
  towupper

  acos asin atan
  acosf asinf atanf
  acosl asinl atanl
  atan2 atan2f atan2l
  cos cosf cosl
  sin sinf sinl
  tan tanf tanl
  cosh coshf coshl
  sinh sinhf sinhl
  tanh tanhf tanhl
  acosh acoshf acoshl
  asinh asinhf asinhl
  atanh atanhf atanhl

  exp expf expl
  exp2 exp2f exp2l
  expm1 expm1f expm1l
  frexp frexpf frexpl
  ldexp ldexpf ldexpl
  log logf logl
  log10 log10f log10l
  log1p log1pf log1pl
  log2 log2f log2l
  modf modff modfl
  scalbn scalbnf scalbnl
  scalbln scalblnf scalblnl

  pow powf powl
  sqrt sqrtf sqrtl
  cbrt cbrtf cbrtl
  hypot hypotf hypotl

  ceil ceilf ceill
  floor floorf floorl
  trunc truncf truncl
  round roundf roundl
  lround lroundf lroundl
  llround llroundf llroundl
  nearbyint nearbyintf nearbyintl
  rint rintf rintl
  lrint lrintf lrintl
  llrint llrintf llrintl

  fabs fabsf fabsl
  fdim fdimf fdiml
  fmax fmaxf fmaxl
  fmin fminf fminl
  fma fmaf fmal
  fmod fmodf fmodl
  remainder remainderf remainderl
  remquo remquof remquol
  copysign copysignf copysignl
  nan nanf nanl
  nextafter nextafterf nextafterl
  nexttoward nexttowardf nexttowardl

  erf erff erfl
  erfc erfcf erfcl
  tgamma tgammaf tgammal
  lgamma lgammaf lgammal

  isfinite
  isinf
  isnan
  isnormal
  signbit
  fpclassify
  isgreater
  isgreaterequal
  isless
  islessequal
  islessgreater
  isunordered

  HUGE_VAL
  HUGE_VALF
  HUGE_VALL
  INFINITY
  NAN
  M_E
  M_LOG2E
  M_LOG10E
  M_LN2
  M_LN10
  M_PI
  M_PI_2
  M_PI_4
  M_1_PI
  M_2_PI
  M_2_SQRTPI
  M_SQRT2
  M_SQRT1_2

  fenv_t
  fexcept_t
  feclearexcept
  fegetexceptflag
  feraiseexcept
  fesetexceptflag
  fetestexcept
  fegetround
  fesetround
  fegetenv
  fesetenv
  feholdexcept
  feupdateenv
  FE_DIVBYZERO
  FE_INEXACT
  FE_INVALID
  FE_OVERFLOW
  FE_UNDERFLOW
  FE_ALL_EXCEPT
  FE_DOWNWARD
  FE_TONEAREST
  FE_TOWARDZERO
  FE_UPWARD

  jmp_buf
  sigjmp_buf
  setjmp
  longjmp
  sigsetjmp
  siglongjmp

  EXIT_SUCCESS
  EXIT_FAILURE
  MB_CUR_MAX
  MB_LEN_MAX

  mbstate_t
  mbrlen
  mbrtowc
  mbsinit
  mbsrtowcs
  mbrtoc16
  mbrtoc32
  mbrtoc8
  wcrtomb
  wcsrtombs
  wcrtomb
  c16rtomb
  c32rtomb
  c8rtomb

  wchar_t
  wint_t
  wctrans_t
  wctype_t

  wcscpy
  wcsncpy
  wcscat
  wcsncat
  wcscmp
  wcsncmp
  wcschr
  wcsrchr
  wcsstr
  wcsspn
  wcscspn
  wcspbrk
  wcslen
  wcsxfrm
  wcstok
  wcstok_s

  wmemcpy
  wmemmove
  wmemset
  wmemcmp
  wmemchr

  btowc
  wctob
  mbrlen
  mbrtowc
  mbsrtowcs
  wcrtomb
  wcsrtombs

  fopen_s
  scanf_s
  printf_s
  memcpy_s
  strcpy_s
  strcat_s
  strncpy_s
  memset_s

  aligned_alloc
  aligned_free

  exit
  quick_exit
  _Exit
  atexit
  at_quick_exit
  abort

  getenv
  setenv
  unsetenv
  putenv
  clearenv

  system

  realpath
  canonicalize_file_name
  basename
  dirname

  mktemp
  mkstemp
  mkstemps
  mkdtemp

  access
  chmod
  fchmod
  chown
  fchown
  umask

  stat
  fstat
  lstat
  fstatat

  mkdir
  mkdirat
  rmdir

  link
  linkat
  unlink
  unlinkat
  symlink
  symlinkat
  readlink
  readlinkat

  open
  openat
  creat
  close
  dup
  dup2
  dup3

  read
  write
  pread
  pwrite
  readv
  writev

  lseek
  ftruncate
  fsync
  fdatasync

  pipe
  pipe2
  poll
  ppoll
  select
  pselect

  mmap
  munmap
  mprotect
  madvise
  msync
  mlock
  munlock
  mlockall
  munlockall

  fork
  vfork
  execv
  execve
  execvp
  execl
  execlp
  execle
  wait
  waitpid
  waitid

  getpid
  getppid
  getuid
  geteuid
  getgid
  getegid
  getpgid
  setuid
  seteuid
  setgid
  setegid

  signal
  sigaction
  sigprocmask
  pthread_sigmask
  raise
  kill
  alarm
  pause
  sigemptyset
  sigfillset
  sigaddset
  sigdelset
  sigismember

  SIGABRT
  SIGFPE
  SIGILL
  SIGINT
  SIGSEGV
  SIGTERM
  SIGKILL
  SIGSTOP
  SIGCONT
  SIGCHLD
  SIGPIPE
  SIGALRM

  struct
  union
  enum
  typedef

  offsetof
  alignas
  alignof
  _Alignof

  typeof
  typeof_unqual
  __typeof__
  __attribute__
  __declspec

  inline
  restrict
  _Atomic
  atomic_bool
  atomic_char
  atomic_schar
  atomic_uchar
  atomic_short
  atomic_ushort
  atomic_int
  atomic_uint
  atomic_long
  atomic_ulong
  atomic_llong
  atomic_ullong
  atomic_intptr_t
  atomic_uintptr_t
  atomic_size_t
  atomic_ptrdiff_t
  atomic_flag

  atomic_init
  atomic_store
  atomic_load
  atomic_exchange
  atomic_compare_exchange_strong
  atomic_compare_exchange_weak
  atomic_fetch_add
  atomic_fetch_sub
  atomic_fetch_or
  atomic_fetch_xor
  atomic_fetch_and
  atomic_thread_fence
  atomic_signal_fence
  atomic_flag_test_and_set
  atomic_flag_clear

  memory_order
  memory_order_relaxed
  memory_order_consume
  memory_order_acquire
  memory_order_release
  memory_order_acq_rel
  memory_order_seq_cst

  thrd_t
  thrd_create
  thrd_join
  thrd_detach
  thrd_current
  thrd_equal
  thrd_sleep
  thrd_yield
  thrd_exit
  thrd_success
  thrd_nomem
  thrd_timedout
  thrd_busy

  mtx_t
  mtx_init
  mtx_lock
  mtx_trylock
  mtx_timedlock
  mtx_unlock
  mtx_destroy
  mtx_plain
  mtx_recursive
  mtx_timed

  cnd_t
  cnd_init
  cnd_wait
  cnd_timedwait
  cnd_signal
  cnd_broadcast
  cnd_destroy

  tss_t
  tss_create
  tss_get
  tss_set
  tss_delete

  once_flag
  ONCE_FLAG_INIT
  call_once

  threads_h
  stdatomic
  stdbool
  stdint
  stddef
  stdalign
  stdarg
  stdatomic
  stdbit
  stdckdint
  stdcharconv
  stdcomplex
  stddefer
  stderrno
  stdfloat
  stdint
  stdio
  stdlib
  stdnoreturn
  stdptr
  stdsignal
  stdstdalign
  stdstdarg
  stdstdatomic
  stdstddef
  stdstring
  stdthreads
  stdtime
  stdtype
  stdwchar
  stdwctype

  complex
  float_t
  double_t

  atomic_compare_exchange_strong_explicit
  atomic_compare_exchange_weak_explicit
  atomic_exchange_explicit
  atomic_fetch_add_explicit
  atomic_fetch_and_explicit
  atomic_fetch_or_explicit
  atomic_fetch_sub_explicit
  atomic_fetch_xor_explicit
  atomic_load_explicit
  atomic_store_explicit
  atomic_flag_clear_explicit
  atomic_flag_test_and_set_explicit
  atomic_init

  cnd_broadcast
  cnd_destroy
  cnd_init
  cnd_signal
  cnd_timedwait
  cnd_wait

  call_once

  mtx_destroy
  mtx_init
  mtx_lock
  mtx_timedlock
  mtx_trylock
  mtx_unlock

  tss_create
  tss_delete
  tss_get
  tss_set

  thrd_create
  thrd_current
  thrd_detach
  thrd_equal
  thrd_exit
  thrd_join
  thrd_sleep
  thrd_yield

  FILE
  fpos_t
  off_t
  ssize_t
  mode_t
  pid_t
  uid_t
  gid_t
  time_t
  clock_t
  struct_stat
  DIR
  dirent

  opendir
  fdopendir
  readdir
  readdir_r
  closedir
  rewinddir
  seekdir
  telldir

  errno
  EACCES
  EAGAIN
  EBADF
  EBUSY
  ECHILD
  EDEADLK
  EDOM
  EEXIST
  EINTR
  EINVAL
  EIO
  EISDIR
  EMFILE
  ENFILE
  ENODEV
  ENOENT
  ENOMEM
  ENOSPC
  ENOSYS
  ENOTDIR
  ENOTEMPTY
  ENOTSUP
  EPERM
  EPIPE
  ERANGE
  EROFS
  ETIMEDOUT
  EXDEV

  perror
  strerror
  strerror_r

  _Pragma
  _Generic
  default

  va_copy
  va_end
  va_arg
  va_start

  __FILE__
  __LINE__
  __DATE__
  __TIME__
  __STDC__
  __STDC_HOSTED__
  __STDC_VERSION__
  __STDC_UTF_16__
  __STDC_UTF_32__
  __STDC_MB_MIGHT_NEQ_WC__

  __GNUC__
  __GNUC_MINOR__
  __GNUC_PATCHLEVEL__
  __clang__
  __clang_major__
  __clang_minor__
  __clang_patchlevel__
  _MSC_VER
  __MINGW32__
  __MINGW64__
  _WIN32
  _WIN64
  __linux__
  __unix__
  __APPLE__
  __ANDROID__
  __FreeBSD__

  include
  define
  undef
  if
  ifdef
  ifndef
  elif
  else
  endif
  pragma
  error
  warning
  line

  #include
  #define
  #undef
  #if
  #ifdef
  #ifndef
  #elif
  #else
  #endif
  #pragma
  #error
  #warning
  #line

  NULL
  EOF
  SEEK_SET
  SEEK_CUR
  SEEK_END
  EXIT_SUCCESS
  EXIT_FAILURE

  CLOCKS_PER_SEC
  RAND_MAX

  FP_INFINITE
  FP_NAN
  FP_NORMAL
  FP_SUBNORMAL
  FP_ZERO

  FE_DIVBYZERO
  FE_INEXACT
  FE_INVALID
  FE_OVERFLOW
  FE_UNDERFLOW
  FE_ALL_EXCEPT

  FE_DOWNWARD
  FE_TONEAREST
  FE_TOWARDZERO
  FE_UPWARD

  _Static_assert
  static_assert

  __asm__
  __asm
  asm
  __volatile__
  volatile

  __builtin_expect
  __builtin_unreachable
  __builtin_assume
  __builtin_prefetch
  __builtin_clz
  __builtin_ctz
  __builtin_popcount
  __builtin_parity
  __builtin_bswap16
  __builtin_bswap32
  __builtin_bswap64
  __builtin_add_overflow
  __builtin_sub_overflow
  __builtin_mul_overflow

  size_t
  NULL
  offsetof
`.split(/\s+/),
    cs: `
      abstract as base bool break byte case catch char checked class const
      continue decimal default delegate do double else enum event explicit
      extern false finally fixed float for foreach goto if implicit in int
      interface internal is lock long namespace new null object operator out
      override params private protected public readonly ref return sbyte
      sealed short sizeof stackalloc static string struct switch this throw
      true try typeof uint ulong unchecked unsafe ushort using virtual void
      volatile while

      record init required with when
      nameof typeof default
      var dynamic

      Console WriteLine WriteLineAsync
      Write ReadLine ReadKey
      Debug Trace
      Environment
      GC

      List Dictionary HashSet Queue Stack
      LinkedList
      SortedList SortedDictionary SortedSet
      ConcurrentDictionary ConcurrentBag ConcurrentQueue
      IEnumerable IEnumerator
      ICollection IList
      Array String StringBuilder

      Task ValueTask
      Task.Run Task.Delay Task.WhenAll Task.WhenAny
      async await
      CancellationToken CancellationTokenSource
      Thread ThreadStart
      ThreadPool

      Exception
      ArgumentException
      ArgumentNullException
      ArgumentOutOfRangeException
      InvalidOperationException
      NotImplementedException
      NullReferenceException
      IndexOutOfRangeException
      FormatException
      IOException

      DateTime DateTimeOffset DateOnly TimeOnly TimeSpan
      Guid Uri Version

      Select Where SelectMany
      OrderBy OrderByDescending
      ThenBy ThenByDescending
      GroupBy GroupJoin Join
      ToList ToArray ToDictionary ToLookup ToHashSet
      First FirstOrDefault
      Last LastOrDefault
      Single SingleOrDefault
      ElementAt ElementAtOrDefault
      Any All
      Count LongCount
      Sum Average Min Max
      Aggregate
      Contains
      Distinct
      Skip Take
      SkipWhile TakeWhile
      Reverse
      Concat Union Intersect Except
      Zip
      Chunk

      Regex Match
      RegexOptions

      IDisposable Dispose
      IAsyncDisposable
      IComparable IEquatable

      HttpClient
      HttpRequestMessage HttpResponseMessage HttpMethod
      HttpContent StringContent FormUrlEncodedContent MultipartFormDataContent
      Stream MemoryStream FileStream
      File FileInfo
      Directory DirectoryInfo
      Path

      JsonSerializer JsonDocument JsonElement JsonNode

      Reflection Runtime Interop Services
      Collections Generic Concurrent
      IO Net Linq Threading Tasks
    `.split(/\s+/),

    php: `
      abstract and array as break case catch class clone const continue declare
      default die do echo else elseif empty enddeclare endfor endforeach endif
      endswitch endwhile eval exit extends final finally for foreach function
      global goto if implements include include_once instanceof insteadof
      interface isset list namespace new or print private protected public
      require require_once return static switch throw trait try unset use var
      while xor yield

      match fn readonly

      null true false

      __LINE__ __FILE__ __DIR__ __FUNCTION__ __CLASS__ __METHOD__
      __NAMESPACE__ __TRAIT__
      __PROPERTY__ __COMPILER_HALT_OFFSET__

      $_GET $_POST $_SESSION $_COOKIE $_SERVER $_FILES $_REQUEST $_ENV $_GLOBALS

      count sizeof
      array_merge array_replace array_diff array_diff_assoc
      array_intersect array_intersect_assoc
      array_combine array_keys array_values
      array_unique array_filter array_map array_reduce
      array_walk array_walk_recursive array_column
      array_chunk array_slice array_splice
      array_shift array_pop array_push array_unshift
      array_reverse array_flip array_search array_key_exists
      in_array array_fill array_pad array_sum array_product
      array_rand array_multisort array_sort

      explode implode join
      preg_match preg_match_all preg_replace preg_split
      preg_quote preg_grep preg_replace_callback

      strlen strcasecmp strcmp strncmp
      strpos stripos strrpos strripos
      substr substr_replace
      str_replace str_ireplace
      strtolower strtoupper
      ucfirst lcfirst ucwords
      trim ltrim rtrim
      str_contains str_starts_with str_ends_with
      str_pad str_repeat strrev
      wordwrap nl2br

      json_encode json_decode
      json_last_error json_last_error_msg

      date time strtotime mktime microtime
      DateTime DateTimeImmutable DateInterval DatePeriod

      header headers_sent
      setcookie setrawcookie
      session_start session_destroy session_regenerate_id
      session_get_cookie_params session_set_cookie_params

      fopen fclose fread fwrite
      file_get_contents file_put_contents
      file_exists is_file is_dir
      filesize filemtime
      mkdir rmdir rename copy unlink
      glob scandir

      curl_init curl_setopt curl_setopt_array curl_exec curl_close
      curl_getinfo curl_error

      PDO PDOStatement PDOException
      mysqli mysqli_connect

      Exception Error Throwable
      RuntimeException LogicException
      InvalidArgumentException
      OutOfBoundsException

      gettype settype
      isset empty unset
      is_array is_bool is_callable is_countable
      is_float is_int is_numeric is_object
      is_resource is_scalar is_string is_null

      serialize unserialize
      password_hash password_verify
      hash hash_file hash_hmac
    `.split(/\s+/),

    go: `
      package import func var const type struct interface map chan
      if else switch case default for range break continue return
      go select defer fallthrough goto
      true false nil iota

      int int8 int16 int32 int64
      uint uint8 uint16 uint32 uint64 uintptr
      float32 float64
      complex64 complex128
      string bool byte rune error

      make new append copy len cap close delete clear
      panic recover print println

      fmt Printf Println Sprintf Errorf
      Fprintf Fprint Fprintln
      Scanf Sscanf

      errors New Is As Join
      context Background TODO
      WithCancel WithTimeout WithDeadline WithValue
      Context CancelFunc

      sync Mutex RWMutex WaitGroup Once Cond Pool Map
      atomic AddInt32 AddInt64 LoadInt32 LoadInt64
      StoreInt32 StoreInt64 SwapInt32 SwapInt64
      CompareAndSwapInt32 CompareAndSwapInt64

      net http
      Get Post Head
      Listen ListenAndServe
      Handler HandlerFunc
      Request ResponseWriter
      Client Server
      ServeMux
      Header Cookie
      NewRequest NewServeMux

      json Marshal Unmarshal
      Encoder Decoder NewEncoder NewDecoder

      os File Open Create
      ReadFile WriteFile
      Remove Mkdir MkdirAll
      Rename Stat
      Stdin Stdout Stderr

      io Reader Writer ReadAll Copy CopyBuffer
      EOF

      bufio Scanner Reader Writer
      strings Builder Reader
      bytes Buffer NewBuffer
      strconv Atoi Itoa ParseInt ParseUint ParseFloat FormatInt FormatFloat
      time Time Duration Now Sleep After Since
      Ticker Timer
      regexp Regexp Compile MatchString FindString FindAllString ReplaceAllString
      sort Sort Stable Search Slice
      reflect Type Value
      runtime GOOS GOARCH NumCPU GOMAXPROCS
      log Printf Println Fatal Panic

      testing Test Benchmark Example
    `.split(/\s+/),

    kt: `
      as break class continue do else false for fun if in interface is null object
      package return super this throw true try typealias typeof val var when while
      by catch constructor delegate dynamic field file finally get import init
      param property receiver set setparam where actual abstract annotation
      companion const crossinline data enum expect external final infix inline
      inner internal lateinit noinline open operator out override private
      protected public reified sealed suspend tailrec vararg

      Any Nothing Unit Boolean Byte Short Int Long Float Double Char String

      Array BooleanArray ByteArray ShortArray IntArray LongArray
      FloatArray DoubleArray CharArray

      List MutableList Set MutableSet Map MutableMap
      Collection MutableCollection
      Iterable MutableIterable
      Sequence Iterator
      Pair Triple

      arrayOf booleanArrayOf byteArrayOf
      charArrayOf doubleArrayOf floatArrayOf
      intArrayOf longArrayOf shortArrayOf

      listOf mutableListOf
      setOf mutableSetOf
      mapOf mutableMapOf
      emptyList emptySet emptyMap
      listOfNotNull

      println print

      require requireNotNull
      check checkNotNull
      error
      assert
      TODO

      let run with apply also takeIf takeUnless
      map mapNotNull flatMap
      filter filterNot filterIsInstance
      first firstOrNull
      last lastOrNull
      single singleOrNull
      any all none count
      find findLast
      sorted sortedBy sortedDescending sortedWith
      groupBy groupingBy
      associate associateBy associateWith
      fold foldRight reduce reduceRight
      zip unzip
      chunked windowed
      distinct distinctBy
      plus minus
      contains
      joinToString

      toList toSet toMap
      toInt toLong toDouble toFloat toBoolean
      toChar toByte toShort

      CoroutineScope GlobalScope
      Job Deferred
      launch async await
      runBlocking
      withContext
      Dispatchers Main IO Default Unconfined
      suspend
      Flow StateFlow SharedFlow
      flow emit collect

      Android Activity Fragment
      View ViewModel LiveData
      Bundle Intent Context
      RecyclerView Adapter
      Compose Composable
      remember mutableStateOf
      LaunchedEffect SideEffect
      Column Row Box
      Text Button Image
    `.split(/\s+/),

    swift: `
      associatedtype break case catch class continue default defer deinit do else
      enum extension fallthrough false fileprivate final for func get guard
      if import in indirect infix init inout internal is lazy let mutating
      nil nonmutating open operator optional override private protocol public
      repeat required rethrows return self Self set static struct subscript
      super switch throw throws true try typealias unowned var weak where
      while willSet didSet

      Any AnyObject AnyClass Never Void
      Int Int8 Int16 Int32 Int64
      UInt UInt8 UInt16 UInt32 UInt64
      Float Double Bool Character String

      Array Dictionary Set
      Optional Result
      ClosedRange Range PartialRangeFrom PartialRangeThrough
      KeyValuePairs

      print debugPrint dump fatalError
      precondition assert assertionFailure

      map compactMap flatMap filter reduce
      sorted sortedBy reversed
      first last
      startIndex endIndex count isEmpty
      append insert remove removeFirst removeLast
      reserveCapacity
      contains firstIndex lastIndex
      min max
      joined split

      Foundation
      URL URLRequest URLResponse
      URLSession URLSessionTask
      HTTPURLResponse
      Date DateFormatter Calendar TimeZone
      JSONEncoder JSONDecoder
      JSONSerialization
      FileManager
      UserDefaults
      NotificationCenter
      Bundle
      UUID
      Data

      Dispatch
      DispatchQueue
      DispatchGroup
      DispatchSemaphore
      async sync main global
      Timer

      Combine
      Publisher Subscriber
      AnyPublisher AnySubscriber AnyCancellable
      PassthroughSubject CurrentValueSubject
      sink assign receive
      map tryMap flatMap filter
      debounce throttle

      SwiftUI
      View Text Image Button
      VStack HStack ZStack
      List ScrollView LazyVStack LazyHStack
      NavigationStack NavigationLink
      TabView Form Section
      Spacer Divider
      TextField SecureField
      Toggle Slider Picker
      Sheet FullScreenCover Alert
      State Binding StateObject ObservedObject EnvironmentObject
      Published App Scene WindowGroup
      onAppear onDisappear
      onChange task
      environment
    `.split(/\s+/),

    dart: `
      abstract as assert async await break case catch class const continue
      covariant default deferred do dynamic else enum export extends extension
      external factory false final finally for function get hide if implements
      import in interface is late library mixin new null on operator part
      required rethrow return set show static super switch sync this throw
      true try typedef var void while with yield

      bool int double num String Object dynamic Never Null
      List Map Set Iterable Iterator
      Future Stream Duration DateTime
      FutureOr

      print
      var final const late
      async await sync* async*
      yield yield*

      where map expand reduce fold forEach
      first last firstWhere lastWhere
      single singleWhere
      any every contains
      sort reversed
      add addAll remove removeAt
      insert insertAll clear
      keys values entries
      sublist getRange setRange
      join split replaceAll
      toList toSet toMap

      jsonEncode jsonDecode

      StringBuffer StringSink
      Exception Error StackTrace
      ArgumentError StateError
      FormatException

      FutureBuilder StreamBuilder
      asyncExpand asyncMap
      listen pause resume cancel

      Flutter
      Widget StatelessWidget StatefulWidget State
      BuildContext
      Key GlobalKey ValueKey UniqueKey
      MaterialApp CupertinoApp
      Scaffold AppBar BottomNavigationBar
      Text Container Padding Center
      Row Column Stack
      ListView GridView
      SizedBox Expanded Flexible
      Card
      Image Icon
      ElevatedButton TextButton OutlinedButton
      TextField Form FormField
      Navigator Route
      showDialog showModalBottomSheet
      Theme ThemeData
      MediaQuery
      GestureDetector InkWell
      Animation AnimationController
      StreamController
    `.split(/\s+/),

    bash: `
      if then else elif fi
      for while until in do done
      case esac
      function select
      break continue return exit
      export readonly local declare typeset
      source alias unalias builtin command eval exec
      trap set unset shift getopts
      true false

      echo printf read test
      cd pwd pushd popd dirs
      ls cp mv rm mkdir rmdir touch
      chmod chown chgrp ln
      cat tac less more head tail
      grep egrep fgrep
      sed awk
      cut paste sort uniq
      tr wc tee
      find xargs
      basename dirname realpath readlink
      tar gzip gunzip bzip2 bunzip2 xz unxz
      zip unzip
      curl wget
      ssh scp sftp rsync
      ps top kill killall pkill jobs fg bg wait
      env printenv which whereis type
      sudo su
      apt apt-get dnf yum pacman brew
      systemctl journalctl
      docker podman
      git

      HOME PATH PWD OLDPWD SHELL USER LOGNAME
      UID EUID PPID RANDOM
      BASH_VERSION BASH_SOURCE BASH_LINENO
      HOSTNAME HOSTTYPE OSTYPE
      IFS PS1 PS2 PS3 PS4

      $@ $* $# $? $! $$ $0
      $1 $2 $3 $4 $5 $6 $7 $8 $9
      $(()) $()

      && || ! > >> < << | & ;
    `.split(/\s+/),

    ps1: `
      begin break catch class continue data define do dynamicparam
      else elseif end enum exit filter finally for foreach from
      function if in inlineparam hidden param process return static
      switch throw trap try until using var while workflow

      true false null

      Get-Command Get-Help Get-Member
      Get-Process Get-Service
      Get-ChildItem Get-Content
      Set-Content Add-Content Clear-Content
      Copy-Item Move-Item Remove-Item Rename-Item
      New-Item Test-Path
      Start-Process Stop-Process
      Start-Service Stop-Service Restart-Service
      Invoke-WebRequest Invoke-RestMethod

      Write-Host Write-Output Write-Error
      Write-Warning Write-Verbose Write-Debug
      Read-Host

      Where-Object ForEach-Object
      Select-Object Sort-Object Group-Object
      Measure-Object Compare-Object Select-String

      Import-Module Export-ModuleMember
      Install-Module Update-Module Remove-Module

      ConvertTo-Json ConvertFrom-Json
      ConvertTo-Csv ConvertFrom-Csv

      Format-Table Format-List Format-Wide Format-Custom
      Out-File Out-Host Out-Null Out-String Out-GridView

      Clear-Host
      Set-Location Get-Location
      Push-Location Pop-Location

      $PSVersionTable $HOME $PWD $PROFILE
      $env $args $input $_ $PSItem
      $Error $WarningPreference $VerbosePreference
      $DebugPreference $InformationPreference

      [string] [int] [long] [double] [decimal]
      [bool] [array] [hashtable]
      [datetime] [guid] [regex]
    `.split(/\s+/),

    css: `
      margin margin-top margin-right margin-bottom margin-left
      padding padding-top padding-right padding-bottom padding-left

      display visibility position
      top right bottom left inset

      width min-width max-width
      height min-height max-height

      box-sizing box-decoration-break

      color
      background background-color background-image
      background-size background-position background-repeat
      background-attachment background-clip background-origin

      border border-width border-style border-color
      border-top border-right border-bottom border-left
      border-radius
      border-top-left-radius border-top-right-radius
      border-bottom-left-radius border-bottom-right-radius

      outline outline-width outline-style outline-color outline-offset

      box-shadow
      opacity

      overflow overflow-x overflow-y
      overflow-wrap overflow-anchor
      overscroll-behavior

      z-index

      float clear

      flex flex-grow flex-shrink flex-basis
      flex-direction flex-wrap flex-flow
      justify-content justify-items justify-self
      align-items align-content align-self
      place-content place-items place-self
      gap row-gap column-gap

      grid
      grid-template grid-template-columns grid-template-rows
      grid-template-areas
      grid-column grid-column-start grid-column-end
      grid-row grid-row-start grid-row-end
      grid-area
      grid-auto-columns grid-auto-rows grid-auto-flow

      font font-family font-size font-weight
      font-style font-variant font-stretch
      font-feature-settings font-variation-settings
      line-height letter-spacing word-spacing

      text-align text-align-last
      text-decoration text-decoration-line
      text-decoration-color text-decoration-style
      text-transform text-indent
      text-shadow text-overflow
      white-space word-break word-wrap overflow-wrap
      hyphens

      list-style list-style-type list-style-position
      content

      cursor
      pointer-events
      user-select
      resize
      appearance

      transition transition-property
      transition-duration transition-delay
      transition-timing-function

      animation animation-name animation-duration
      animation-delay animation-timing-function
      animation-iteration-count animation-direction
      animation-fill-mode animation-play-state

      transform transform-origin transform-style
      translate translateX translateY translateZ
      rotate rotateX rotateY rotateZ
      scale scaleX scaleY scaleZ
      skew skewX skewY
      perspective perspective-origin
      backface-visibility

      filter backdrop-filter

      object-fit object-position

      clip clip-path

      columns column-count column-width column-gap
      column-rule column-span column-fill

      break-before break-after break-inside

      accent-color
      caret-color

      scroll-behavior scroll-snap-type
      scroll-snap-align scroll-margin scroll-padding

      aspect-ratio

      isolation mix-blend-mode

      var calc min max clamp
      rgb rgba hsl hsla hwb lab lch
      color-mix light-dark

      none auto inherit initial unset revert revert-layer
      transparent currentColor

      @media @supports @keyframes @font-face
      @import @layer @container @scope
      @property

      :root :host
      :hover :active :focus :focus-visible :focus-within
      :visited :target :checked :disabled :enabled
      :required :optional :valid :invalid
      :first-child :last-child :only-child
      :nth-child :nth-last-child
      :first-of-type :last-of-type
      :nth-of-type :nth-last-of-type
      :not :is :where :has

      ::before ::after
      ::first-letter ::first-line
      ::selection ::placeholder
      ::marker ::backdrop ::file-selector-button
    `.split(/\s+/),

    sql: `
      SELECT FROM WHERE
      INSERT INTO VALUES
      UPDATE SET
      DELETE
      MERGE

      CREATE ALTER DROP TRUNCATE RENAME
      TABLE DATABASE SCHEMA VIEW INDEX SEQUENCE
      PROCEDURE FUNCTION TRIGGER

      JOIN LEFT RIGHT FULL INNER CROSS OUTER
      ON USING

      GROUP BY HAVING
      ORDER BY ASC DESC
      LIMIT OFFSET
      FETCH FIRST NEXT ROWS ONLY
      TOP

      DISTINCT ALL
      UNION UNION ALL
      INTERSECT EXCEPT

      WITH RECURSIVE

      CASE WHEN THEN ELSE END

      AND OR NOT XOR
      IN NOT IN
      EXISTS NOT EXISTS
      LIKE NOT LIKE
      ILIKE NOT ILIKE
      BETWEEN NOT BETWEEN
      IS IS NOT
      NULL TRUE FALSE

      PRIMARY KEY
      FOREIGN KEY
      REFERENCES
      CONSTRAINT
      UNIQUE
      CHECK
      DEFAULT

      CASCADE RESTRICT
      NO ACTION
      SET NULL
      SET DEFAULT

      COUNT SUM AVG MIN MAX
      STDDEV STDDEV_POP STDDEV_SAMP
      VARIANCE VAR_POP VAR_SAMP

      COALESCE NULLIF
      GREATEST LEAST

      CAST CONVERT
      EXTRACT

      CURRENT_DATE CURRENT_TIME CURRENT_TIMESTAMP
      CURRENT_USER SESSION_USER
      LOCALTIME LOCALTIMESTAMP
      NOW

      DATE TIME TIMESTAMP
      INTERVAL YEAR MONTH DAY HOUR MINUTE SECOND

      GRANT REVOKE
      COMMIT ROLLBACK
      SAVEPOINT RELEASE
      TRANSACTION
      BEGIN START
      ISOLATION LEVEL
      SERIALIZABLE REPEATABLE READ READ COMMITTED READ UNCOMMITTED

      CASCADE RESTRICT

      EXPLAIN ANALYZE
      VACUUM ANALYZE
      REINDEX

      SERIAL BIGSERIAL
      UUID
      JSON JSONB
      ARRAY
      BOOLEAN
      INTEGER BIGINT SMALLINT
      DECIMAL NUMERIC REAL DOUBLE PRECISION
      VARCHAR CHAR TEXT
      BLOB

      RETURNING
      ON CONFLICT
      DO NOTHING
      DO UPDATE

      OVER PARTITION BY
      ROW_NUMBER RANK DENSE_RANK
      LAG LEAD
      FIRST_VALUE LAST_VALUE
    `.split(/\s+/),

    zig: `
      addrspace align allowzero anytype asm async await break call catch
      comptime const continue defer else enum errdefer error export extern
      fn for if inline noalias nosuspend opaque or orelse packed pub
      resume return linksection struct suspend switch test threadlocal
      try union unreachable usingnamespace var volatile while

      true false null undefined

      bool void noreturn type anyerror anyopaque

      u8 u16 u32 u64 u128 u256 usize
      i8 i16 i32 i64 i128 i256 isize
      f16 f32 f64 f80 f128

      c_char c_short c_ushort c_int c_uint
      c_long c_ulong c_longlong c_ulonglong

      comptime_int comptime_float

      @import @cImport @embedFile
      @This @Type @typeInfo @TypeOf
      @sizeOf @alignOf @bitSizeOf
      @intCast @floatCast @ptrCast @constCast @bitCast
      @truncate @as @call
      @memcpy @memset @memmove
      @compileError @compileLog
      @panic @trap

      std
      debug
      log
      fmt
      io
      fs
      heap
      mem
      ArrayList
      ArrayHashMap
      HashMap
      AutoHashMap
      StringHashMap
      PriorityQueue
      DynamicBitSet
      BitSet

      allocator
      alloc
      free
      resize
      realloc

      print
      panic

      optional
      error_union
      error
      anyerror

      try catch
      orelse
    `.split(/\s+/),

    html: `
      html head body title base meta link style script noscript
      div span p a img picture source audio video track iframe
      object embed param
      form input textarea button select option optgroup label
      fieldset legend datalist output
      table caption colgroup col thead tbody tfoot tr td th
      ul ol li dl dt dd
      header footer main nav section article aside
      h1 h2 h3 h4 h5 h6
      strong em b i u small mark del ins sub sup
      pre code blockquote q cite
      br hr wbr
      canvas svg path circle ellipse rect line polygon polyline
      template slot dialog
      details summary
      address time data
      id class style title lang dir hidden tabindex
      href src alt width height height
      loading decoding crossorigin referrerpolicy
      target rel download ping
      action method enctype autocomplete
      type name value placeholder
      required disabled readonly
      checked selected multiple
      min max step pattern
      autofocus form novalidate
      accept capture
      cols rows wrap
      aria-label aria-hidden aria-describedby aria-labelledby
      aria-controls aria-expanded aria-selected aria-checked
      role
    `.split(/\s+/),

    json: `
      true false null
    `.split(/\s+/),

    yaml: `
      true false null yes no on off
      anchors aliases
      !!str !!int !!float !!bool !!null !!timestamp !!seq !!map
    `.split(/\s+/),

    toml: `
      true false
    `.split(/\s+/),

    graphql: `
      query mutation subscription fragment
      schema scalar type interface union enum input
      directive extend
      implements on repeatable
      String Int Float Boolean ID
    `.split(/\s+/),

    algo: `
  Algorithme Procedure Fonction
  Debut Fin
  Si Alors Sinon Finsi
  Pour Finpour
  Tantque Faire Fintantque
  Repeter Jusqua
  Retourner
  Entree Sortie
  Lire Ecrire
  Entier Reel Chaine Booleen Caractere
  Tableau Matrice
  Vrai Faux
  Et Ou Non
  Variable Constante
  Mod Div
  Selon Cas Finselon

  abs
  Ent
  int
  Arrondi
  round
  Racine_carré
  sqrt
  Aléa
  randint
  abs
  long
  len
  pos
  find
  convch
  str
  valeur
  isdigit
  isdecimal
  isnumeric
  sous_chaine
  upper
  majus
  effacer
`.split(/\s+/),
    asm: `
      rax rbx rcx rdx rsi rdi rbp rsp r8 r9 r10 r11 r12 r13 r14 r15
      eax ebx ecx edx esi edi ebp esp r8d r9d r10d r11d r12d r13d r14d r15d
      ax bx cx dx si di bp sp r8w r9w r10w r11w r12w r13w r14w r15w
      al bl cl dl sil dil bpl spl r8b r9b r10b r11b r12b r13b r14b r15b
      ah bh ch dh

      cs ds ss es fs gs eip rip eflags rflags
      cr0 cr2 cr3 cr4 cr8 dr0 dr1 dr2 dr3 dr6 dr7
      st0 st1 st2 st3 st4 st5 st6 st7
      mm0 mm1 mm2 mm3 mm4 mm5 mm6 mm7
      xmm0 xmm1 xmm2 xmm3 xmm4 xmm5 xmm6 xmm7 xmm8 xmm9 xmm10 xmm11 xmm12 xmm13 xmm14 xmm15
      ymm0 ymm1 ymm2 ymm3 ymm4 ymm5 ymm6 ymm7 ymm8 ymm9 ymm10 ymm11 ymm12 ymm13 ymm14 ymm15
      zmm0 zmm1 zmm2 zmm3 zmm4 zmm5 zmm6 zmm7 zmm8 zmm9 zmm10 zmm11 zmm12 zmm13 zmm14 zmm15

      mov movzx movsx movabs lea xchg cmov cmove cmovne cmovg cmovge cmovl cmovle 
      cmova cmovae cmovb cmovbe cmovs cmovns cmovz cmovnz cmovo cmovno cmovp cmovnp
      push pop pushad popad pushfd popfd

      add sub mul imul div idiv inc dec neg adc sbb
      and or xor not test shl shr sal sar rol ror rcl rcr
      bt bts btr btc bsf bsr

      cmp test jmp call ret je jne jz jnz jg jge jl jle ja jae jb jbe 
      js jns jo jno jp jnp jecxz jrcxz loop loope loopne
      enter leave

      movsb movsw movsd movsq lodsb lodsw lodsd lodsq stosb stosw stosd stosq
      cmpsb cmpsw cmpsd cmpsq scasb scasw scasd scasq
      rep repe repne repz repnz

      fld fst fstp fadd fsub fmul fdiv fcom fcomp finit fldz fld1
      addps subps mulps divps xorps andps andnps orps movaps movups
      addss subss mulss divss xorpx movss

      int syscall sysenter sysexit hlt nop cpuid rdtsc rdtscp
      clc stc cli sti cld std
      in out ins outs

      section segment global extern db dw dd dq dt resb resw resd resq rest
      equ times macro endm include bits org align ptr byte word dword qword tword
    `.split(/\s+/),
  };
}
