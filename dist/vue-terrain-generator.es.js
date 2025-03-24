import { defineComponent as ne, ref as ie, reactive as re, onMounted as oe, nextTick as Y, onUnmounted as ae, createElementBlock as ce, openBlock as le, createElementVNode as K } from "vue";
import * as N from "three";
import { Color as ue, Matrix4 as ee, Vector3 as z, Quaternion as fe, BufferAttribute as _, REVISION as he, CompressedTexture as k, Source as pe, NoColorSpace as de, MathUtils as V, RGBAFormat as xe, DoubleSide as ge, PropertyBinding as B, InterpolateDiscrete as ye, Scene as W, SRGBColorSpace as Te, NearestFilter as me, NearestMipmapNearestFilter as we, NearestMipmapLinearFilter as Me, LinearFilter as Ae, LinearMipmapNearestFilter as Ee, LinearMipmapLinearFilter as Ie, ClampToEdgeWrapping as Re, RepeatWrapping as be, MirroredRepeatWrapping as Se, InterpolateLinear as Ne } from "three";
import Le from "simplex-noise";
const q = {
  POSITION: [
    "byte",
    "byte normalized",
    "unsigned byte",
    "unsigned byte normalized",
    "short",
    "short normalized",
    "unsigned short",
    "unsigned short normalized"
  ],
  NORMAL: [
    "byte normalized",
    "short normalized"
  ],
  TANGENT: [
    "byte normalized",
    "short normalized"
  ],
  TEXCOORD: [
    "byte",
    "byte normalized",
    "unsigned byte",
    "short",
    "short normalized",
    "unsigned short"
  ]
};
class G {
  constructor() {
    this.textureUtils = null, this.pluginCallbacks = [], this.register(function(e) {
      return new De(e);
    }), this.register(function(e) {
      return new ke(e);
    }), this.register(function(e) {
      return new je(e);
    }), this.register(function(e) {
      return new Ye(e);
    }), this.register(function(e) {
      return new Ke(e);
    }), this.register(function(e) {
      return new We(e);
    }), this.register(function(e) {
      return new Pe(e);
    }), this.register(function(e) {
      return new He(e);
    }), this.register(function(e) {
      return new Ve(e);
    }), this.register(function(e) {
      return new qe(e);
    }), this.register(function(e) {
      return new Xe(e);
    }), this.register(function(e) {
      return new Je(e);
    }), this.register(function(e) {
      return new Ze(e);
    }), this.register(function(e) {
      return new $e(e);
    });
  }
  register(e) {
    return this.pluginCallbacks.indexOf(e) === -1 && this.pluginCallbacks.push(e), this;
  }
  unregister(e) {
    return this.pluginCallbacks.indexOf(e) !== -1 && this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e), 1), this;
  }
  setTextureUtils(e) {
    return this.textureUtils = e, this;
  }
  /**
   * Parse scenes and generate GLTF output
   *
   * @param  {Scene|Array<Scene>} input   Scene or Array of THREE.Scenes
   * @param  {Function} onDone  Callback on completed
   * @param  {Function} onError  Callback on errors
   * @param  {Object} options options
   */
  parse(e, t, n, s) {
    const r = new Ge(), i = [];
    for (let o = 0, c = this.pluginCallbacks.length; o < c; o++)
      i.push(this.pluginCallbacks[o](r));
    r.setPlugins(i), r.setTextureUtils(this.textureUtils), r.writeAsync(e, t, s).catch(n);
  }
  parseAsync(e, t) {
    const n = this;
    return new Promise(function(s, r) {
      n.parse(e, s, r, t);
    });
  }
}
const y = {
  POINTS: 0,
  LINES: 1,
  LINE_LOOP: 2,
  LINE_STRIP: 3,
  TRIANGLES: 4,
  BYTE: 5120,
  UNSIGNED_BYTE: 5121,
  SHORT: 5122,
  UNSIGNED_SHORT: 5123,
  INT: 5124,
  UNSIGNED_INT: 5125,
  FLOAT: 5126,
  ARRAY_BUFFER: 34962,
  ELEMENT_ARRAY_BUFFER: 34963,
  NEAREST: 9728,
  LINEAR: 9729,
  NEAREST_MIPMAP_NEAREST: 9984,
  LINEAR_MIPMAP_NEAREST: 9985,
  NEAREST_MIPMAP_LINEAR: 9986,
  LINEAR_MIPMAP_LINEAR: 9987,
  CLAMP_TO_EDGE: 33071,
  MIRRORED_REPEAT: 33648,
  REPEAT: 10497
}, P = "KHR_mesh_quantization", b = {};
b[me] = y.NEAREST;
b[we] = y.NEAREST_MIPMAP_NEAREST;
b[Me] = y.NEAREST_MIPMAP_LINEAR;
b[Ae] = y.LINEAR;
b[Ee] = y.LINEAR_MIPMAP_NEAREST;
b[Ie] = y.LINEAR_MIPMAP_LINEAR;
b[Re] = y.CLAMP_TO_EDGE;
b[be] = y.REPEAT;
b[Se] = y.MIRRORED_REPEAT;
const X = {
  scale: "scale",
  position: "translation",
  quaternion: "rotation",
  morphTargetInfluences: "weights"
}, _e = new ue(), J = 12, Ce = 1179937895, Ue = 2, Z = 8, Fe = 1313821514, ve = 5130562;
function O(a, e) {
  return a.length === e.length && a.every(function(t, n) {
    return t === e[n];
  });
}
function Oe(a) {
  return new TextEncoder().encode(a).buffer;
}
function ze(a) {
  return O(a.elements, [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
}
function Be(a, e, t) {
  const n = {
    min: new Array(a.itemSize).fill(Number.POSITIVE_INFINITY),
    max: new Array(a.itemSize).fill(Number.NEGATIVE_INFINITY)
  };
  for (let s = e; s < e + t; s++)
    for (let r = 0; r < a.itemSize; r++) {
      let i;
      a.itemSize > 4 ? i = a.array[s * a.itemSize + r] : (r === 0 ? i = a.getX(s) : r === 1 ? i = a.getY(s) : r === 2 ? i = a.getZ(s) : r === 3 && (i = a.getW(s)), a.normalized === !0 && (i = V.normalize(i, a.array))), n.min[r] = Math.min(n.min[r], i), n.max[r] = Math.max(n.max[r], i);
    }
  return n;
}
function te(a) {
  return Math.ceil(a / 4) * 4;
}
function H(a, e = 0) {
  const t = te(a.byteLength);
  if (t !== a.byteLength) {
    const n = new Uint8Array(t);
    if (n.set(new Uint8Array(a)), e !== 0)
      for (let s = a.byteLength; s < t; s++)
        n[s] = e;
    return n.buffer;
  }
  return a;
}
function $() {
  return typeof document > "u" && typeof OffscreenCanvas < "u" ? new OffscreenCanvas(1, 1) : document.createElement("canvas");
}
function Q(a, e) {
  if (a.toBlob !== void 0)
    return new Promise((n) => a.toBlob(n, e));
  let t;
  return e === "image/jpeg" ? t = 0.92 : e === "image/webp" && (t = 0.8), a.convertToBlob({
    type: e,
    quality: t
  });
}
class Ge {
  constructor() {
    this.plugins = [], this.options = {}, this.pending = [], this.buffers = [], this.byteOffset = 0, this.buffers = [], this.nodeMap = /* @__PURE__ */ new Map(), this.skins = [], this.extensionsUsed = {}, this.extensionsRequired = {}, this.uids = /* @__PURE__ */ new Map(), this.uid = 0, this.json = {
      asset: {
        version: "2.0",
        generator: "THREE.GLTFExporter r" + he
      }
    }, this.cache = {
      meshes: /* @__PURE__ */ new Map(),
      attributes: /* @__PURE__ */ new Map(),
      attributesNormalized: /* @__PURE__ */ new Map(),
      materials: /* @__PURE__ */ new Map(),
      textures: /* @__PURE__ */ new Map(),
      images: /* @__PURE__ */ new Map()
    }, this.textureUtils = null;
  }
  setPlugins(e) {
    this.plugins = e;
  }
  setTextureUtils(e) {
    this.textureUtils = e;
  }
  /**
   * Parse scenes and generate GLTF output
   *
   * @param {Scene|Array<Scene>} input Scene or Array of THREE.Scenes
   * @param {Function} onDone Callback on completed
   * @param {Object} options options
   */
  async writeAsync(e, t, n = {}) {
    this.options = Object.assign({
      // default options
      binary: !1,
      trs: !1,
      onlyVisible: !0,
      maxTextureSize: 1 / 0,
      animations: [],
      includeCustomExtensions: !1
    }, n), this.options.animations.length > 0 && (this.options.trs = !0), await this.processInputAsync(e), await Promise.all(this.pending);
    const s = this, r = s.buffers, i = s.json;
    n = s.options;
    const o = s.extensionsUsed, c = s.extensionsRequired, u = new Blob(r, { type: "application/octet-stream" }), d = Object.keys(o), l = Object.keys(c);
    if (d.length > 0 && (i.extensionsUsed = d), l.length > 0 && (i.extensionsRequired = l), i.buffers && i.buffers.length > 0 && (i.buffers[0].byteLength = u.size), n.binary === !0) {
      const T = new FileReader();
      T.readAsArrayBuffer(u), T.onloadend = function() {
        const f = H(T.result), x = new DataView(new ArrayBuffer(Z));
        x.setUint32(0, f.byteLength, !0), x.setUint32(4, ve, !0);
        const g = H(Oe(JSON.stringify(i)), 32), h = new DataView(new ArrayBuffer(Z));
        h.setUint32(0, g.byteLength, !0), h.setUint32(4, Fe, !0);
        const m = new ArrayBuffer(J), w = new DataView(m);
        w.setUint32(0, Ce, !0), w.setUint32(4, Ue, !0);
        const L = J + h.byteLength + g.byteLength + x.byteLength + f.byteLength;
        w.setUint32(8, L, !0);
        const p = new Blob([
          m,
          h,
          g,
          x,
          f
        ], { type: "application/octet-stream" }), M = new FileReader();
        M.readAsArrayBuffer(p), M.onloadend = function() {
          t(M.result);
        };
      };
    } else if (i.buffers && i.buffers.length > 0) {
      const T = new FileReader();
      T.readAsDataURL(u), T.onloadend = function() {
        const f = T.result;
        i.buffers[0].uri = f, t(i);
      };
    } else
      t(i);
  }
  /**
   * Serializes a userData.
   *
   * @param {THREE.Object3D|THREE.Material} object
   * @param {Object} objectDef
   */
  serializeUserData(e, t) {
    if (Object.keys(e.userData).length === 0) return;
    const n = this.options, s = this.extensionsUsed;
    try {
      const r = JSON.parse(JSON.stringify(e.userData));
      if (n.includeCustomExtensions && r.gltfExtensions) {
        t.extensions === void 0 && (t.extensions = {});
        for (const i in r.gltfExtensions)
          t.extensions[i] = r.gltfExtensions[i], s[i] = !0;
        delete r.gltfExtensions;
      }
      Object.keys(r).length > 0 && (t.extras = r);
    } catch (r) {
      console.warn("THREE.GLTFExporter: userData of '" + e.name + "' won't be serialized because of JSON.stringify error - " + r.message);
    }
  }
  /**
   * Returns ids for buffer attributes.
   *
   * @param  {Object} attribute
   * @param {boolean} [isRelativeCopy=false]
   * @return {number} An integer
   */
  getUID(e, t = !1) {
    if (this.uids.has(e) === !1) {
      const s = /* @__PURE__ */ new Map();
      s.set(!0, this.uid++), s.set(!1, this.uid++), this.uids.set(e, s);
    }
    return this.uids.get(e).get(t);
  }
  /**
   * Checks if normal attribute values are normalized.
   *
   * @param {BufferAttribute} normal
   * @returns {boolean}
   */
  isNormalizedNormalAttribute(e) {
    if (this.cache.attributesNormalized.has(e)) return !1;
    const n = new z();
    for (let s = 0, r = e.count; s < r; s++)
      if (Math.abs(n.fromBufferAttribute(e, s).length() - 1) > 5e-4) return !1;
    return !0;
  }
  /**
   * Creates normalized normal buffer attribute.
   *
   * @param {BufferAttribute} normal
   * @returns {BufferAttribute}
   *
   */
  createNormalizedNormalAttribute(e) {
    const t = this.cache;
    if (t.attributesNormalized.has(e)) return t.attributesNormalized.get(e);
    const n = e.clone(), s = new z();
    for (let r = 0, i = n.count; r < i; r++)
      s.fromBufferAttribute(n, r), s.x === 0 && s.y === 0 && s.z === 0 ? s.setX(1) : s.normalize(), n.setXYZ(r, s.x, s.y, s.z);
    return t.attributesNormalized.set(e, n), n;
  }
  /**
   * Applies a texture transform, if present, to the map definition. Requires
   * the KHR_texture_transform extension.
   *
   * @param {Object} mapDef
   * @param {THREE.Texture} texture
   */
  applyTextureTransform(e, t) {
    let n = !1;
    const s = {};
    (t.offset.x !== 0 || t.offset.y !== 0) && (s.offset = t.offset.toArray(), n = !0), t.rotation !== 0 && (s.rotation = t.rotation, n = !0), (t.repeat.x !== 1 || t.repeat.y !== 1) && (s.scale = t.repeat.toArray(), n = !0), n && (e.extensions = e.extensions || {}, e.extensions.KHR_texture_transform = s, this.extensionsUsed.KHR_texture_transform = !0);
  }
  async buildMetalRoughTextureAsync(e, t) {
    if (e === t) return e;
    function n(f) {
      return f.colorSpace === Te ? function(g) {
        return g < 0.04045 ? g * 0.0773993808 : Math.pow(g * 0.9478672986 + 0.0521327014, 2.4);
      } : function(g) {
        return g;
      };
    }
    e instanceof k && (e = await this.decompressTextureAsync(e)), t instanceof k && (t = await this.decompressTextureAsync(t));
    const s = e ? e.image : null, r = t ? t.image : null, i = Math.max(s ? s.width : 0, r ? r.width : 0), o = Math.max(s ? s.height : 0, r ? r.height : 0), c = $();
    c.width = i, c.height = o;
    const u = c.getContext("2d", {
      willReadFrequently: !0
    });
    u.fillStyle = "#00ffff", u.fillRect(0, 0, i, o);
    const d = u.getImageData(0, 0, i, o);
    if (s) {
      u.drawImage(s, 0, 0, i, o);
      const f = n(e), x = u.getImageData(0, 0, i, o).data;
      for (let g = 2; g < x.length; g += 4)
        d.data[g] = f(x[g] / 256) * 256;
    }
    if (r) {
      u.drawImage(r, 0, 0, i, o);
      const f = n(t), x = u.getImageData(0, 0, i, o).data;
      for (let g = 1; g < x.length; g += 4)
        d.data[g] = f(x[g] / 256) * 256;
    }
    u.putImageData(d, 0, 0);
    const T = (e || t).clone();
    return T.source = new pe(c), T.colorSpace = de, T.channel = (e || t).channel, e && t && e.channel !== t.channel && console.warn("THREE.GLTFExporter: UV channels for metalnessMap and roughnessMap textures must match."), console.warn("THREE.GLTFExporter: Merged metalnessMap and roughnessMap textures."), T;
  }
  async decompressTextureAsync(e, t = 1 / 0) {
    if (this.textureUtils === null)
      throw new Error("THREE.GLTFExporter: setTextureUtils() must be called to process compressed textures.");
    return await this.textureUtils.decompress(e, t);
  }
  /**
   * Process a buffer to append to the default one.
   * @param  {ArrayBuffer} buffer
   * @return {0}
   */
  processBuffer(e) {
    const t = this.json, n = this.buffers;
    return t.buffers || (t.buffers = [{ byteLength: 0 }]), n.push(e), 0;
  }
  /**
   * Process and generate a BufferView
   * @param {BufferAttribute} attribute
   * @param {number} componentType
   * @param {number} start
   * @param {number} count
   * @param {?number} target Target usage of the BufferView
   * @return {Object}
   */
  processBufferView(e, t, n, s, r) {
    const i = this.json;
    i.bufferViews || (i.bufferViews = []);
    let o;
    switch (t) {
      case y.BYTE:
      case y.UNSIGNED_BYTE:
        o = 1;
        break;
      case y.SHORT:
      case y.UNSIGNED_SHORT:
        o = 2;
        break;
      default:
        o = 4;
    }
    let c = e.itemSize * o;
    r === y.ARRAY_BUFFER && (c = Math.ceil(c / 4) * 4);
    const u = te(s * c), d = new DataView(new ArrayBuffer(u));
    let l = 0;
    for (let x = n; x < n + s; x++) {
      for (let g = 0; g < e.itemSize; g++) {
        let h;
        e.itemSize > 4 ? h = e.array[x * e.itemSize + g] : (g === 0 ? h = e.getX(x) : g === 1 ? h = e.getY(x) : g === 2 ? h = e.getZ(x) : g === 3 && (h = e.getW(x)), e.normalized === !0 && (h = V.normalize(h, e.array))), t === y.FLOAT ? d.setFloat32(l, h, !0) : t === y.INT ? d.setInt32(l, h, !0) : t === y.UNSIGNED_INT ? d.setUint32(l, h, !0) : t === y.SHORT ? d.setInt16(l, h, !0) : t === y.UNSIGNED_SHORT ? d.setUint16(l, h, !0) : t === y.BYTE ? d.setInt8(l, h) : t === y.UNSIGNED_BYTE && d.setUint8(l, h), l += o;
      }
      l % c !== 0 && (l += c - l % c);
    }
    const T = {
      buffer: this.processBuffer(d.buffer),
      byteOffset: this.byteOffset,
      byteLength: u
    };
    return r !== void 0 && (T.target = r), r === y.ARRAY_BUFFER && (T.byteStride = c), this.byteOffset += u, i.bufferViews.push(T), {
      id: i.bufferViews.length - 1,
      byteLength: 0
    };
  }
  /**
   * Process and generate a BufferView from an image Blob.
   * @param {Blob} blob
   * @return {Promise<number>} An integer
   */
  processBufferViewImage(e) {
    const t = this, n = t.json;
    return n.bufferViews || (n.bufferViews = []), new Promise(function(s) {
      const r = new FileReader();
      r.readAsArrayBuffer(e), r.onloadend = function() {
        const i = H(r.result), o = {
          buffer: t.processBuffer(i),
          byteOffset: t.byteOffset,
          byteLength: i.byteLength
        };
        t.byteOffset += i.byteLength, s(n.bufferViews.push(o) - 1);
      };
    });
  }
  /**
   * Process attribute to generate an accessor
   * @param {BufferAttribute} attribute Attribute to process
   * @param {?BufferGeometry} geometry Geometry used for truncated draw range
   * @param {number} [start=0]
   * @param {number} [count=Infinity]
   * @return {?number} Index of the processed accessor on the "accessors" array
   */
  processAccessor(e, t, n, s) {
    const r = this.json, i = {
      1: "SCALAR",
      2: "VEC2",
      3: "VEC3",
      4: "VEC4",
      9: "MAT3",
      16: "MAT4"
    };
    let o;
    if (e.array.constructor === Float32Array)
      o = y.FLOAT;
    else if (e.array.constructor === Int32Array)
      o = y.INT;
    else if (e.array.constructor === Uint32Array)
      o = y.UNSIGNED_INT;
    else if (e.array.constructor === Int16Array)
      o = y.SHORT;
    else if (e.array.constructor === Uint16Array)
      o = y.UNSIGNED_SHORT;
    else if (e.array.constructor === Int8Array)
      o = y.BYTE;
    else if (e.array.constructor === Uint8Array)
      o = y.UNSIGNED_BYTE;
    else
      throw new Error("THREE.GLTFExporter: Unsupported bufferAttribute component type: " + e.array.constructor.name);
    if (n === void 0 && (n = 0), (s === void 0 || s === 1 / 0) && (s = e.count), s === 0) return null;
    const c = Be(e, n, s);
    let u;
    t !== void 0 && (u = e === t.index ? y.ELEMENT_ARRAY_BUFFER : y.ARRAY_BUFFER);
    const d = this.processBufferView(e, o, n, s, u), l = {
      bufferView: d.id,
      byteOffset: d.byteOffset,
      componentType: o,
      count: s,
      max: c.max,
      min: c.min,
      type: i[e.itemSize]
    };
    return e.normalized === !0 && (l.normalized = !0), r.accessors || (r.accessors = []), r.accessors.push(l) - 1;
  }
  /**
   * Process image
   * @param  {Image} image to process
   * @param  {number} format Identifier of the format (RGBAFormat)
   * @param  {boolean} flipY before writing out the image
   * @param  {string} mimeType export format
   * @return {number}     Index of the processed texture in the "images" array
   */
  processImage(e, t, n, s = "image/png") {
    if (e !== null) {
      const r = this, i = r.cache, o = r.json, c = r.options, u = r.pending;
      i.images.has(e) || i.images.set(e, {});
      const d = i.images.get(e), l = s + ":flipY/" + n.toString();
      if (d[l] !== void 0) return d[l];
      o.images || (o.images = []);
      const T = { mimeType: s }, f = $();
      f.width = Math.min(e.width, c.maxTextureSize), f.height = Math.min(e.height, c.maxTextureSize);
      const x = f.getContext("2d", {
        willReadFrequently: !0
      });
      if (n === !0 && (x.translate(0, f.height), x.scale(1, -1)), e.data !== void 0) {
        t !== xe && console.error("GLTFExporter: Only RGBAFormat is supported.", t), (e.width > c.maxTextureSize || e.height > c.maxTextureSize) && console.warn("GLTFExporter: Image size is bigger than maxTextureSize", e);
        const h = new Uint8ClampedArray(e.height * e.width * 4);
        for (let m = 0; m < h.length; m += 4)
          h[m + 0] = e.data[m + 0], h[m + 1] = e.data[m + 1], h[m + 2] = e.data[m + 2], h[m + 3] = e.data[m + 3];
        x.putImageData(new ImageData(h, e.width, e.height), 0, 0);
      } else if (typeof HTMLImageElement < "u" && e instanceof HTMLImageElement || typeof HTMLCanvasElement < "u" && e instanceof HTMLCanvasElement || typeof ImageBitmap < "u" && e instanceof ImageBitmap || typeof OffscreenCanvas < "u" && e instanceof OffscreenCanvas)
        x.drawImage(e, 0, 0, f.width, f.height);
      else
        throw new Error("THREE.GLTFExporter: Invalid image type. Use HTMLImageElement, HTMLCanvasElement, ImageBitmap or OffscreenCanvas.");
      c.binary === !0 ? u.push(
        Q(f, s).then((h) => r.processBufferViewImage(h)).then((h) => {
          T.bufferView = h;
        })
      ) : f.toDataURL !== void 0 ? T.uri = f.toDataURL(s) : u.push(
        Q(f, s).then((h) => new FileReader().readAsDataURL(h)).then((h) => {
          T.uri = h;
        })
      );
      const g = o.images.push(T) - 1;
      return d[l] = g, g;
    } else
      throw new Error("THREE.GLTFExporter: No valid image data found. Unable to process texture.");
  }
  /**
   * Process sampler
   * @param  {Texture} map Texture to process
   * @return {number}      Index of the processed texture in the "samplers" array
   */
  processSampler(e) {
    const t = this.json;
    t.samplers || (t.samplers = []);
    const n = {
      magFilter: b[e.magFilter],
      minFilter: b[e.minFilter],
      wrapS: b[e.wrapS],
      wrapT: b[e.wrapT]
    };
    return t.samplers.push(n) - 1;
  }
  /**
   * Process texture
   * @param  {Texture} map Map to process
   * @return {Promise<number>} Index of the processed texture in the "textures" array
   */
  async processTextureAsync(e) {
    const n = this.options, s = this.cache, r = this.json;
    if (s.textures.has(e)) return s.textures.get(e);
    r.textures || (r.textures = []), e instanceof k && (e = await this.decompressTextureAsync(e, n.maxTextureSize));
    let i = e.userData.mimeType;
    i === "image/webp" && (i = "image/png");
    const o = {
      sampler: this.processSampler(e),
      source: this.processImage(e.image, e.format, e.flipY, i)
    };
    e.name && (o.name = e.name), await this._invokeAllAsync(async function(u) {
      u.writeTexture && await u.writeTexture(e, o);
    });
    const c = r.textures.push(o) - 1;
    return s.textures.set(e, c), c;
  }
  /**
   * Process material
   * @param  {THREE.Material} material Material to process
   * @return {Promise<number|null>} Index of the processed material in the "materials" array
   */
  async processMaterialAsync(e) {
    const t = this.cache, n = this.json;
    if (t.materials.has(e)) return t.materials.get(e);
    if (e.isShaderMaterial)
      return console.warn("GLTFExporter: THREE.ShaderMaterial not supported."), null;
    n.materials || (n.materials = []);
    const s = { pbrMetallicRoughness: {} };
    e.isMeshStandardMaterial !== !0 && e.isMeshBasicMaterial !== !0 && console.warn("GLTFExporter: Use MeshStandardMaterial or MeshBasicMaterial for best results.");
    const r = e.color.toArray().concat([e.opacity]);
    if (O(r, [1, 1, 1, 1]) || (s.pbrMetallicRoughness.baseColorFactor = r), e.isMeshStandardMaterial ? (s.pbrMetallicRoughness.metallicFactor = e.metalness, s.pbrMetallicRoughness.roughnessFactor = e.roughness) : (s.pbrMetallicRoughness.metallicFactor = 0, s.pbrMetallicRoughness.roughnessFactor = 1), e.metalnessMap || e.roughnessMap) {
      const o = await this.buildMetalRoughTextureAsync(e.metalnessMap, e.roughnessMap), c = {
        index: await this.processTextureAsync(o),
        texCoord: o.channel
      };
      this.applyTextureTransform(c, o), s.pbrMetallicRoughness.metallicRoughnessTexture = c;
    }
    if (e.map) {
      const o = {
        index: await this.processTextureAsync(e.map),
        texCoord: e.map.channel
      };
      this.applyTextureTransform(o, e.map), s.pbrMetallicRoughness.baseColorTexture = o;
    }
    if (e.emissive) {
      const o = e.emissive;
      if (Math.max(o.r, o.g, o.b) > 0 && (s.emissiveFactor = e.emissive.toArray()), e.emissiveMap) {
        const u = {
          index: await this.processTextureAsync(e.emissiveMap),
          texCoord: e.emissiveMap.channel
        };
        this.applyTextureTransform(u, e.emissiveMap), s.emissiveTexture = u;
      }
    }
    if (e.normalMap) {
      const o = {
        index: await this.processTextureAsync(e.normalMap),
        texCoord: e.normalMap.channel
      };
      e.normalScale && e.normalScale.x !== 1 && (o.scale = e.normalScale.x), this.applyTextureTransform(o, e.normalMap), s.normalTexture = o;
    }
    if (e.aoMap) {
      const o = {
        index: await this.processTextureAsync(e.aoMap),
        texCoord: e.aoMap.channel
      };
      e.aoMapIntensity !== 1 && (o.strength = e.aoMapIntensity), this.applyTextureTransform(o, e.aoMap), s.occlusionTexture = o;
    }
    e.transparent ? s.alphaMode = "BLEND" : e.alphaTest > 0 && (s.alphaMode = "MASK", s.alphaCutoff = e.alphaTest), e.side === ge && (s.doubleSided = !0), e.name !== "" && (s.name = e.name), this.serializeUserData(e, s), await this._invokeAllAsync(async function(o) {
      o.writeMaterialAsync && await o.writeMaterialAsync(e, s);
    });
    const i = n.materials.push(s) - 1;
    return t.materials.set(e, i), i;
  }
  /**
   * Process mesh
   * @param  {THREE.Mesh} mesh Mesh to process
   * @return {Promise<number|null>} Index of the processed mesh in the "meshes" array
   */
  async processMeshAsync(e) {
    const t = this.cache, n = this.json, s = [e.geometry.uuid];
    if (Array.isArray(e.material))
      for (let p = 0, M = e.material.length; p < M; p++)
        s.push(e.material[p].uuid);
    else
      s.push(e.material.uuid);
    const r = s.join(":");
    if (t.meshes.has(r)) return t.meshes.get(r);
    const i = e.geometry;
    let o;
    e.isLineSegments ? o = y.LINES : e.isLineLoop ? o = y.LINE_LOOP : e.isLine ? o = y.LINE_STRIP : e.isPoints ? o = y.POINTS : o = e.material.wireframe ? y.LINES : y.TRIANGLES;
    const c = {}, u = {}, d = [], l = [], T = {
      uv: "TEXCOORD_0",
      uv1: "TEXCOORD_1",
      uv2: "TEXCOORD_2",
      uv3: "TEXCOORD_3",
      color: "COLOR_0",
      skinWeight: "WEIGHTS_0",
      skinIndex: "JOINTS_0"
    }, f = i.getAttribute("normal");
    f !== void 0 && !this.isNormalizedNormalAttribute(f) && (console.warn("THREE.GLTFExporter: Creating normalized normal attribute from the non-normalized one."), i.setAttribute("normal", this.createNormalizedNormalAttribute(f)));
    let x = null;
    for (let p in i.attributes) {
      if (p.slice(0, 5) === "morph") continue;
      const M = i.attributes[p];
      if (p = T[p] || p.toUpperCase(), /^(POSITION|NORMAL|TANGENT|TEXCOORD_\d+|COLOR_\d+|JOINTS_\d+|WEIGHTS_\d+)$/.test(p) || (p = "_" + p), t.attributes.has(this.getUID(M))) {
        u[p] = t.attributes.get(this.getUID(M));
        continue;
      }
      x = null;
      const A = M.array;
      p === "JOINTS_0" && !(A instanceof Uint16Array) && !(A instanceof Uint8Array) ? (console.warn('GLTFExporter: Attribute "skinIndex" converted to type UNSIGNED_SHORT.'), x = new _(new Uint16Array(A), M.itemSize, M.normalized)) : (A instanceof Uint32Array || A instanceof Int32Array) && !p.startsWith("_") && (console.warn(`GLTFExporter: Attribute "${p}" converted to type FLOAT.`), x = G.Utils.toFloat32BufferAttribute(M));
      const R = this.processAccessor(x || M, i);
      R !== null && (p.startsWith("_") || this.detectMeshQuantization(p, M), u[p] = R, t.attributes.set(this.getUID(M), R));
    }
    if (f !== void 0 && i.setAttribute("normal", f), Object.keys(u).length === 0) return null;
    if (e.morphTargetInfluences !== void 0 && e.morphTargetInfluences.length > 0) {
      const p = [], M = [], E = {};
      if (e.morphTargetDictionary !== void 0)
        for (const A in e.morphTargetDictionary)
          E[e.morphTargetDictionary[A]] = A;
      for (let A = 0; A < e.morphTargetInfluences.length; ++A) {
        const R = {};
        let j = !1;
        for (const U in i.morphAttributes) {
          if (U !== "position" && U !== "normal") {
            j || (console.warn("GLTFExporter: Only POSITION and NORMAL morph are supported."), j = !0);
            continue;
          }
          const S = i.morphAttributes[U][A], D = U.toUpperCase(), F = i.attributes[U];
          if (t.attributes.has(this.getUID(S, !0))) {
            R[D] = t.attributes.get(this.getUID(S, !0));
            continue;
          }
          const v = S.clone();
          if (!i.morphTargetsRelative)
            for (let I = 0, se = S.count; I < se; I++)
              for (let C = 0; C < S.itemSize; C++)
                C === 0 && v.setX(I, S.getX(I) - F.getX(I)), C === 1 && v.setY(I, S.getY(I) - F.getY(I)), C === 2 && v.setZ(I, S.getZ(I) - F.getZ(I)), C === 3 && v.setW(I, S.getW(I) - F.getW(I));
          R[D] = this.processAccessor(v, i), t.attributes.set(this.getUID(F, !0), R[D]);
        }
        l.push(R), p.push(e.morphTargetInfluences[A]), e.morphTargetDictionary !== void 0 && M.push(E[A]);
      }
      c.weights = p, M.length > 0 && (c.extras = {}, c.extras.targetNames = M);
    }
    const g = Array.isArray(e.material);
    if (g && i.groups.length === 0) return null;
    let h = !1;
    if (g && i.index === null) {
      const p = [];
      for (let M = 0, E = i.attributes.position.count; M < E; M++)
        p[M] = M;
      i.setIndex(p), h = !0;
    }
    const m = g ? e.material : [e.material], w = g ? i.groups : [{ materialIndex: 0, start: void 0, count: void 0 }];
    for (let p = 0, M = w.length; p < M; p++) {
      const E = {
        mode: o,
        attributes: u
      };
      if (this.serializeUserData(i, E), l.length > 0 && (E.targets = l), i.index !== null) {
        let R = this.getUID(i.index);
        (w[p].start !== void 0 || w[p].count !== void 0) && (R += ":" + w[p].start + ":" + w[p].count), t.attributes.has(R) ? E.indices = t.attributes.get(R) : (E.indices = this.processAccessor(i.index, i, w[p].start, w[p].count), t.attributes.set(R, E.indices)), E.indices === null && delete E.indices;
      }
      const A = await this.processMaterialAsync(m[w[p].materialIndex]);
      A !== null && (E.material = A), d.push(E);
    }
    h === !0 && i.setIndex(null), c.primitives = d, n.meshes || (n.meshes = []), await this._invokeAllAsync(function(p) {
      p.writeMesh && p.writeMesh(e, c);
    });
    const L = n.meshes.push(c) - 1;
    return t.meshes.set(r, L), L;
  }
  /**
   * If a vertex attribute with a
   * [non-standard data type](https://registry.khronos.org/glTF/specs/2.0/glTF-2.0.html#meshes-overview)
   * is used, it is checked whether it is a valid data type according to the
   * [KHR_mesh_quantization](https://github.com/KhronosGroup/glTF/blob/main/extensions/2.0/Khronos/KHR_mesh_quantization/README.md)
   * extension.
   * In this case the extension is automatically added to the list of used extensions.
   *
   * @param {string} attributeName
   * @param {THREE.BufferAttribute} attribute
   */
  detectMeshQuantization(e, t) {
    if (this.extensionsUsed[P]) return;
    let n;
    switch (t.array.constructor) {
      case Int8Array:
        n = "byte";
        break;
      case Uint8Array:
        n = "unsigned byte";
        break;
      case Int16Array:
        n = "short";
        break;
      case Uint16Array:
        n = "unsigned short";
        break;
      default:
        return;
    }
    t.normalized && (n += " normalized");
    const s = e.split("_", 1)[0];
    q[s] && q[s].includes(n) && (this.extensionsUsed[P] = !0, this.extensionsRequired[P] = !0);
  }
  /**
   * Process camera
   * @param  {THREE.Camera} camera Camera to process
   * @return {number} Index of the processed mesh in the "camera" array
   */
  processCamera(e) {
    const t = this.json;
    t.cameras || (t.cameras = []);
    const n = e.isOrthographicCamera, s = {
      type: n ? "orthographic" : "perspective"
    };
    return n ? s.orthographic = {
      xmag: e.right * 2,
      ymag: e.top * 2,
      zfar: e.far <= 0 ? 1e-3 : e.far,
      znear: e.near < 0 ? 0 : e.near
    } : s.perspective = {
      aspectRatio: e.aspect,
      yfov: V.degToRad(e.fov),
      zfar: e.far <= 0 ? 1e-3 : e.far,
      znear: e.near < 0 ? 0 : e.near
    }, e.name !== "" && (s.name = e.type), t.cameras.push(s) - 1;
  }
  /**
   * Creates glTF animation entry from AnimationClip object.
   *
   * Status:
   * - Only properties listed in PATH_PROPERTIES may be animated.
   *
   * @param {THREE.AnimationClip} clip
   * @param {THREE.Object3D} root
   * @return {number|null}
   */
  processAnimation(e, t) {
    const n = this.json, s = this.nodeMap;
    n.animations || (n.animations = []), e = G.Utils.mergeMorphTargetTracks(e.clone(), t);
    const r = e.tracks, i = [], o = [];
    for (let c = 0; c < r.length; ++c) {
      const u = r[c], d = B.parseTrackName(u.name);
      let l = B.findNode(t, d.nodeName);
      const T = X[d.propertyName];
      if (d.objectName === "bones" && (l.isSkinnedMesh === !0 ? l = l.skeleton.getBoneByName(d.objectIndex) : l = void 0), !l || !T) {
        console.warn('THREE.GLTFExporter: Could not export animation track "%s".', u.name);
        continue;
      }
      const f = 1;
      let x = u.values.length / u.times.length;
      T === X.morphTargetInfluences && (x /= l.morphTargetInfluences.length);
      let g;
      u.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline === !0 ? (g = "CUBICSPLINE", x /= 3) : u.getInterpolation() === ye ? g = "STEP" : g = "LINEAR", o.push({
        input: this.processAccessor(new _(u.times, f)),
        output: this.processAccessor(new _(u.values, x)),
        interpolation: g
      }), i.push({
        sampler: o.length - 1,
        target: {
          node: s.get(l),
          path: T
        }
      });
    }
    return n.animations.push({
      name: e.name || "clip_" + n.animations.length,
      samplers: o,
      channels: i
    }), n.animations.length - 1;
  }
  /**
   * @param {THREE.Object3D} object
   * @return {number|null}
   */
  processSkin(e) {
    const t = this.json, n = this.nodeMap, s = t.nodes[n.get(e)], r = e.skeleton;
    if (r === void 0) return null;
    const i = e.skeleton.bones[0];
    if (i === void 0) return null;
    const o = [], c = new Float32Array(r.bones.length * 16), u = new ee();
    for (let l = 0; l < r.bones.length; ++l)
      o.push(n.get(r.bones[l])), u.copy(r.boneInverses[l]), u.multiply(e.bindMatrix).toArray(c, l * 16);
    return t.skins === void 0 && (t.skins = []), t.skins.push({
      inverseBindMatrices: this.processAccessor(new _(c, 16)),
      joints: o,
      skeleton: n.get(i)
    }), s.skin = t.skins.length - 1;
  }
  /**
   * Process Object3D node
   * @param  {THREE.Object3D} object Object3D to processNodeAsync
   * @return {Promise<number>} Index of the node in the nodes list
   */
  async processNodeAsync(e) {
    const t = this.json, n = this.options, s = this.nodeMap;
    t.nodes || (t.nodes = []);
    const r = {};
    if (n.trs) {
      const o = e.quaternion.toArray(), c = e.position.toArray(), u = e.scale.toArray();
      O(o, [0, 0, 0, 1]) || (r.rotation = o), O(c, [0, 0, 0]) || (r.translation = c), O(u, [1, 1, 1]) || (r.scale = u);
    } else
      e.matrixAutoUpdate && e.updateMatrix(), ze(e.matrix) === !1 && (r.matrix = e.matrix.elements);
    if (e.name !== "" && (r.name = String(e.name)), this.serializeUserData(e, r), e.isMesh || e.isLine || e.isPoints) {
      const o = await this.processMeshAsync(e);
      o !== null && (r.mesh = o);
    } else e.isCamera && (r.camera = this.processCamera(e));
    if (e.isSkinnedMesh && this.skins.push(e), e.children.length > 0) {
      const o = [];
      for (let c = 0, u = e.children.length; c < u; c++) {
        const d = e.children[c];
        if (d.visible || n.onlyVisible === !1) {
          const l = await this.processNodeAsync(d);
          l !== null && o.push(l);
        }
      }
      o.length > 0 && (r.children = o);
    }
    await this._invokeAllAsync(function(o) {
      o.writeNode && o.writeNode(e, r);
    });
    const i = t.nodes.push(r) - 1;
    return s.set(e, i), i;
  }
  /**
   * Process Scene
   * @param  {Scene} scene Scene to process
   */
  async processSceneAsync(e) {
    const t = this.json, n = this.options;
    t.scenes || (t.scenes = [], t.scene = 0);
    const s = {};
    e.name !== "" && (s.name = e.name), t.scenes.push(s);
    const r = [];
    for (let i = 0, o = e.children.length; i < o; i++) {
      const c = e.children[i];
      if (c.visible || n.onlyVisible === !1) {
        const u = await this.processNodeAsync(c);
        u !== null && r.push(u);
      }
    }
    r.length > 0 && (s.nodes = r), this.serializeUserData(e, s);
  }
  /**
   * Creates a Scene to hold a list of objects and parse it
   * @param  {Array<THREE.Object3D>} objects List of objects to process
   */
  async processObjectsAsync(e) {
    const t = new W();
    t.name = "AuxScene";
    for (let n = 0; n < e.length; n++)
      t.children.push(e[n]);
    await this.processSceneAsync(t);
  }
  /**
   * @param {THREE.Object3D|Array<THREE.Object3D>} input
   */
  async processInputAsync(e) {
    const t = this.options;
    e = e instanceof Array ? e : [e], await this._invokeAllAsync(function(s) {
      s.beforeParse && s.beforeParse(e);
    });
    const n = [];
    for (let s = 0; s < e.length; s++)
      e[s] instanceof W ? await this.processSceneAsync(e[s]) : n.push(e[s]);
    n.length > 0 && await this.processObjectsAsync(n);
    for (let s = 0; s < this.skins.length; ++s)
      this.processSkin(this.skins[s]);
    for (let s = 0; s < t.animations.length; ++s)
      this.processAnimation(t.animations[s], e[0]);
    await this._invokeAllAsync(function(s) {
      s.afterParse && s.afterParse(e);
    });
  }
  async _invokeAllAsync(e) {
    for (let t = 0, n = this.plugins.length; t < n; t++)
      await e(this.plugins[t]);
  }
}
class De {
  constructor(e) {
    this.writer = e, this.name = "KHR_lights_punctual";
  }
  writeNode(e, t) {
    if (!e.isLight) return;
    if (!e.isDirectionalLight && !e.isPointLight && !e.isSpotLight) {
      console.warn("THREE.GLTFExporter: Only directional, point, and spot lights are supported.", e);
      return;
    }
    const n = this.writer, s = n.json, r = n.extensionsUsed, i = {};
    e.name && (i.name = e.name), i.color = e.color.toArray(), i.intensity = e.intensity, e.isDirectionalLight ? i.type = "directional" : e.isPointLight ? (i.type = "point", e.distance > 0 && (i.range = e.distance)) : e.isSpotLight && (i.type = "spot", e.distance > 0 && (i.range = e.distance), i.spot = {}, i.spot.innerConeAngle = (1 - e.penumbra) * e.angle, i.spot.outerConeAngle = e.angle), e.decay !== void 0 && e.decay !== 2 && console.warn("THREE.GLTFExporter: Light decay may be lost. glTF is physically-based, and expects light.decay=2."), e.target && (e.target.parent !== e || e.target.position.x !== 0 || e.target.position.y !== 0 || e.target.position.z !== -1) && console.warn("THREE.GLTFExporter: Light direction may be lost. For best results, make light.target a child of the light with position 0,0,-1."), r[this.name] || (s.extensions = s.extensions || {}, s.extensions[this.name] = { lights: [] }, r[this.name] = !0);
    const o = s.extensions[this.name].lights;
    o.push(i), t.extensions = t.extensions || {}, t.extensions[this.name] = { light: o.length - 1 };
  }
}
class ke {
  constructor(e) {
    this.writer = e, this.name = "KHR_materials_unlit";
  }
  async writeMaterialAsync(e, t) {
    if (!e.isMeshBasicMaterial) return;
    const s = this.writer.extensionsUsed;
    t.extensions = t.extensions || {}, t.extensions[this.name] = {}, s[this.name] = !0, t.pbrMetallicRoughness.metallicFactor = 0, t.pbrMetallicRoughness.roughnessFactor = 0.9;
  }
}
class Pe {
  constructor(e) {
    this.writer = e, this.name = "KHR_materials_clearcoat";
  }
  async writeMaterialAsync(e, t) {
    if (!e.isMeshPhysicalMaterial || e.clearcoat === 0) return;
    const n = this.writer, s = n.extensionsUsed, r = {};
    if (r.clearcoatFactor = e.clearcoat, e.clearcoatMap) {
      const i = {
        index: await n.processTextureAsync(e.clearcoatMap),
        texCoord: e.clearcoatMap.channel
      };
      n.applyTextureTransform(i, e.clearcoatMap), r.clearcoatTexture = i;
    }
    if (r.clearcoatRoughnessFactor = e.clearcoatRoughness, e.clearcoatRoughnessMap) {
      const i = {
        index: await n.processTextureAsync(e.clearcoatRoughnessMap),
        texCoord: e.clearcoatRoughnessMap.channel
      };
      n.applyTextureTransform(i, e.clearcoatRoughnessMap), r.clearcoatRoughnessTexture = i;
    }
    if (e.clearcoatNormalMap) {
      const i = {
        index: await n.processTextureAsync(e.clearcoatNormalMap),
        texCoord: e.clearcoatNormalMap.channel
      };
      e.clearcoatNormalScale.x !== 1 && (i.scale = e.clearcoatNormalScale.x), n.applyTextureTransform(i, e.clearcoatNormalMap), r.clearcoatNormalTexture = i;
    }
    t.extensions = t.extensions || {}, t.extensions[this.name] = r, s[this.name] = !0;
  }
}
class He {
  constructor(e) {
    this.writer = e, this.name = "KHR_materials_dispersion";
  }
  async writeMaterialAsync(e, t) {
    if (!e.isMeshPhysicalMaterial || e.dispersion === 0) return;
    const s = this.writer.extensionsUsed, r = {};
    r.dispersion = e.dispersion, t.extensions = t.extensions || {}, t.extensions[this.name] = r, s[this.name] = !0;
  }
}
class Ve {
  constructor(e) {
    this.writer = e, this.name = "KHR_materials_iridescence";
  }
  async writeMaterialAsync(e, t) {
    if (!e.isMeshPhysicalMaterial || e.iridescence === 0) return;
    const n = this.writer, s = n.extensionsUsed, r = {};
    if (r.iridescenceFactor = e.iridescence, e.iridescenceMap) {
      const i = {
        index: await n.processTextureAsync(e.iridescenceMap),
        texCoord: e.iridescenceMap.channel
      };
      n.applyTextureTransform(i, e.iridescenceMap), r.iridescenceTexture = i;
    }
    if (r.iridescenceIor = e.iridescenceIOR, r.iridescenceThicknessMinimum = e.iridescenceThicknessRange[0], r.iridescenceThicknessMaximum = e.iridescenceThicknessRange[1], e.iridescenceThicknessMap) {
      const i = {
        index: await n.processTextureAsync(e.iridescenceThicknessMap),
        texCoord: e.iridescenceThicknessMap.channel
      };
      n.applyTextureTransform(i, e.iridescenceThicknessMap), r.iridescenceThicknessTexture = i;
    }
    t.extensions = t.extensions || {}, t.extensions[this.name] = r, s[this.name] = !0;
  }
}
class je {
  constructor(e) {
    this.writer = e, this.name = "KHR_materials_transmission";
  }
  async writeMaterialAsync(e, t) {
    if (!e.isMeshPhysicalMaterial || e.transmission === 0) return;
    const n = this.writer, s = n.extensionsUsed, r = {};
    if (r.transmissionFactor = e.transmission, e.transmissionMap) {
      const i = {
        index: await n.processTextureAsync(e.transmissionMap),
        texCoord: e.transmissionMap.channel
      };
      n.applyTextureTransform(i, e.transmissionMap), r.transmissionTexture = i;
    }
    t.extensions = t.extensions || {}, t.extensions[this.name] = r, s[this.name] = !0;
  }
}
class Ye {
  constructor(e) {
    this.writer = e, this.name = "KHR_materials_volume";
  }
  async writeMaterialAsync(e, t) {
    if (!e.isMeshPhysicalMaterial || e.transmission === 0) return;
    const n = this.writer, s = n.extensionsUsed, r = {};
    if (r.thicknessFactor = e.thickness, e.thicknessMap) {
      const i = {
        index: await n.processTextureAsync(e.thicknessMap),
        texCoord: e.thicknessMap.channel
      };
      n.applyTextureTransform(i, e.thicknessMap), r.thicknessTexture = i;
    }
    e.attenuationDistance !== 1 / 0 && (r.attenuationDistance = e.attenuationDistance), r.attenuationColor = e.attenuationColor.toArray(), t.extensions = t.extensions || {}, t.extensions[this.name] = r, s[this.name] = !0;
  }
}
class Ke {
  constructor(e) {
    this.writer = e, this.name = "KHR_materials_ior";
  }
  async writeMaterialAsync(e, t) {
    if (!e.isMeshPhysicalMaterial || e.ior === 1.5) return;
    const s = this.writer.extensionsUsed, r = {};
    r.ior = e.ior, t.extensions = t.extensions || {}, t.extensions[this.name] = r, s[this.name] = !0;
  }
}
class We {
  constructor(e) {
    this.writer = e, this.name = "KHR_materials_specular";
  }
  async writeMaterialAsync(e, t) {
    if (!e.isMeshPhysicalMaterial || e.specularIntensity === 1 && e.specularColor.equals(_e) && !e.specularIntensityMap && !e.specularColorMap) return;
    const n = this.writer, s = n.extensionsUsed, r = {};
    if (e.specularIntensityMap) {
      const i = {
        index: await n.processTextureAsync(e.specularIntensityMap),
        texCoord: e.specularIntensityMap.channel
      };
      n.applyTextureTransform(i, e.specularIntensityMap), r.specularTexture = i;
    }
    if (e.specularColorMap) {
      const i = {
        index: await n.processTextureAsync(e.specularColorMap),
        texCoord: e.specularColorMap.channel
      };
      n.applyTextureTransform(i, e.specularColorMap), r.specularColorTexture = i;
    }
    r.specularFactor = e.specularIntensity, r.specularColorFactor = e.specularColor.toArray(), t.extensions = t.extensions || {}, t.extensions[this.name] = r, s[this.name] = !0;
  }
}
class qe {
  constructor(e) {
    this.writer = e, this.name = "KHR_materials_sheen";
  }
  async writeMaterialAsync(e, t) {
    if (!e.isMeshPhysicalMaterial || e.sheen == 0) return;
    const n = this.writer, s = n.extensionsUsed, r = {};
    if (e.sheenRoughnessMap) {
      const i = {
        index: await n.processTextureAsync(e.sheenRoughnessMap),
        texCoord: e.sheenRoughnessMap.channel
      };
      n.applyTextureTransform(i, e.sheenRoughnessMap), r.sheenRoughnessTexture = i;
    }
    if (e.sheenColorMap) {
      const i = {
        index: await n.processTextureAsync(e.sheenColorMap),
        texCoord: e.sheenColorMap.channel
      };
      n.applyTextureTransform(i, e.sheenColorMap), r.sheenColorTexture = i;
    }
    r.sheenRoughnessFactor = e.sheenRoughness, r.sheenColorFactor = e.sheenColor.toArray(), t.extensions = t.extensions || {}, t.extensions[this.name] = r, s[this.name] = !0;
  }
}
class Xe {
  constructor(e) {
    this.writer = e, this.name = "KHR_materials_anisotropy";
  }
  async writeMaterialAsync(e, t) {
    if (!e.isMeshPhysicalMaterial || e.anisotropy == 0) return;
    const n = this.writer, s = n.extensionsUsed, r = {};
    if (e.anisotropyMap) {
      const i = { index: await n.processTextureAsync(e.anisotropyMap) };
      n.applyTextureTransform(i, e.anisotropyMap), r.anisotropyTexture = i;
    }
    r.anisotropyStrength = e.anisotropy, r.anisotropyRotation = e.anisotropyRotation, t.extensions = t.extensions || {}, t.extensions[this.name] = r, s[this.name] = !0;
  }
}
class Je {
  constructor(e) {
    this.writer = e, this.name = "KHR_materials_emissive_strength";
  }
  async writeMaterialAsync(e, t) {
    if (!e.isMeshStandardMaterial || e.emissiveIntensity === 1) return;
    const s = this.writer.extensionsUsed, r = {};
    r.emissiveStrength = e.emissiveIntensity, t.extensions = t.extensions || {}, t.extensions[this.name] = r, s[this.name] = !0;
  }
}
class Ze {
  constructor(e) {
    this.writer = e, this.name = "EXT_materials_bump";
  }
  async writeMaterialAsync(e, t) {
    if (!e.isMeshStandardMaterial || e.bumpScale === 1 && !e.bumpMap) return;
    const n = this.writer, s = n.extensionsUsed, r = {};
    if (e.bumpMap) {
      const i = {
        index: await n.processTextureAsync(e.bumpMap),
        texCoord: e.bumpMap.channel
      };
      n.applyTextureTransform(i, e.bumpMap), r.bumpTexture = i;
    }
    r.bumpFactor = e.bumpScale, t.extensions = t.extensions || {}, t.extensions[this.name] = r, s[this.name] = !0;
  }
}
class $e {
  constructor(e) {
    this.writer = e, this.name = "EXT_mesh_gpu_instancing";
  }
  writeNode(e, t) {
    if (!e.isInstancedMesh) return;
    const n = this.writer, s = e, r = new Float32Array(s.count * 3), i = new Float32Array(s.count * 4), o = new Float32Array(s.count * 3), c = new ee(), u = new z(), d = new fe(), l = new z();
    for (let f = 0; f < s.count; f++)
      s.getMatrixAt(f, c), c.decompose(u, d, l), u.toArray(r, f * 3), d.toArray(i, f * 4), l.toArray(o, f * 3);
    const T = {
      TRANSLATION: n.processAccessor(new _(r, 3)),
      ROTATION: n.processAccessor(new _(i, 4)),
      SCALE: n.processAccessor(new _(o, 3))
    };
    s.instanceColor && (T._COLOR_0 = n.processAccessor(s.instanceColor)), t.extensions = t.extensions || {}, t.extensions[this.name] = { attributes: T }, n.extensionsUsed[this.name] = !0, n.extensionsRequired[this.name] = !0;
  }
}
G.Utils = {
  insertKeyframe: function(a, e) {
    const n = a.getValueSize(), s = new a.TimeBufferType(a.times.length + 1), r = new a.ValueBufferType(a.values.length + n), i = a.createInterpolant(new a.ValueBufferType(n));
    let o;
    if (a.times.length === 0) {
      s[0] = e;
      for (let c = 0; c < n; c++)
        r[c] = 0;
      o = 0;
    } else if (e < a.times[0]) {
      if (Math.abs(a.times[0] - e) < 1e-3) return 0;
      s[0] = e, s.set(a.times, 1), r.set(i.evaluate(e), 0), r.set(a.values, n), o = 0;
    } else if (e > a.times[a.times.length - 1]) {
      if (Math.abs(a.times[a.times.length - 1] - e) < 1e-3)
        return a.times.length - 1;
      s[s.length - 1] = e, s.set(a.times, 0), r.set(a.values, 0), r.set(i.evaluate(e), a.values.length), o = s.length - 1;
    } else
      for (let c = 0; c < a.times.length; c++) {
        if (Math.abs(a.times[c] - e) < 1e-3) return c;
        if (a.times[c] < e && a.times[c + 1] > e) {
          s.set(a.times.slice(0, c + 1), 0), s[c + 1] = e, s.set(a.times.slice(c + 1), c + 2), r.set(a.values.slice(0, (c + 1) * n), 0), r.set(i.evaluate(e), (c + 1) * n), r.set(a.values.slice((c + 1) * n), (c + 2) * n), o = c + 1;
          break;
        }
      }
    return a.times = s, a.values = r, o;
  },
  mergeMorphTargetTracks: function(a, e) {
    const t = [], n = {}, s = a.tracks;
    for (let r = 0; r < s.length; ++r) {
      let i = s[r];
      const o = B.parseTrackName(i.name), c = B.findNode(e, o.nodeName);
      if (o.propertyName !== "morphTargetInfluences" || o.propertyIndex === void 0) {
        t.push(i);
        continue;
      }
      if (i.createInterpolant !== i.InterpolantFactoryMethodDiscrete && i.createInterpolant !== i.InterpolantFactoryMethodLinear) {
        if (i.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline)
          throw new Error("THREE.GLTFExporter: Cannot merge tracks with glTF CUBICSPLINE interpolation.");
        console.warn("THREE.GLTFExporter: Morph target interpolation mode not yet supported. Using LINEAR instead."), i = i.clone(), i.setInterpolation(Ne);
      }
      const u = c.morphTargetInfluences.length, d = c.morphTargetDictionary[o.propertyIndex];
      if (d === void 0)
        throw new Error("THREE.GLTFExporter: Morph target name not found: " + o.propertyIndex);
      let l;
      if (n[c.uuid] === void 0) {
        l = i.clone();
        const f = new l.ValueBufferType(u * l.times.length);
        for (let x = 0; x < l.times.length; x++)
          f[x * u + d] = l.values[x];
        l.name = (o.nodeName || "") + ".morphTargetInfluences", l.values = f, n[c.uuid] = l, t.push(l);
        continue;
      }
      const T = i.createInterpolant(new i.ValueBufferType(1));
      l = n[c.uuid];
      for (let f = 0; f < l.times.length; f++)
        l.values[f * u + d] = T.evaluate(l.times[f]);
      for (let f = 0; f < i.times.length; f++) {
        const x = this.insertKeyframe(l, i.times[f]);
        l.values[x * u + d] = i.values[f];
      }
    }
    return a.tracks = t, a;
  },
  toFloat32BufferAttribute: function(a) {
    const e = new _(new Float32Array(a.count * a.itemSize), a.itemSize, !1);
    if (!a.normalized && !a.isInterleavedBufferAttribute)
      return e.array.set(a.array), e;
    for (let t = 0, n = a.count; t < n; t++)
      for (let s = 0; s < a.itemSize; s++)
        e.setComponent(t, s, a.getComponent(t, s));
    return e;
  }
};
const Qe = ne({
  name: "TerrainGenerator",
  props: {
    terrainSize: { type: Number, default: 1e3 },
    segments: { type: Number, default: 512 },
    heightScaling: { type: Number, default: 80 },
    terrainColor: { type: String, default: "#88cc88" },
    backgroundColor: { type: String, default: "#000000" },
    noiseType: { type: String, default: "simplex" },
    noiseScale: { type: Number, default: 0.02 },
    enableAnimation: { type: Boolean, default: !1 },
    animationSpeed: { type: Number, default: 5e-3 }
  },
  setup(a, { expose: e }) {
    const t = ie(null);
    let n, s, r, i, o, c = new Le(), u = new N.Clock();
    const d = () => {
      new G().parse(n, (m) => {
        const w = new Blob([JSON.stringify(m)], { type: "application/json" }), L = URL.createObjectURL(w), p = document.createElement("a");
        p.style.display = "none", p.href = L, p.download = "random_terrain.gltf", document.body.appendChild(p), p.click(), document.body.removeChild(p);
      });
    }, l = re({
      terrainSize: a.terrainSize,
      segments: a.segments,
      heightScaling: a.heightScaling,
      terrainColor: a.terrainColor,
      backgroundColor: a.backgroundColor,
      noiseType: a.noiseType,
      noiseScale: a.noiseScale,
      enableAnimation: a.enableAnimation,
      animationSpeed: a.animationSpeed
    }), T = (h) => {
      const m = h.attributes.position.array;
      for (let w = 0; w < m.length; w += 3) {
        const L = m[w] * l.noiseScale, p = m[w + 2] * l.noiseScale, M = c.noise2D(L, p);
        m[w + 1] = M * l.heightScaling;
      }
      h.computeVertexNormals();
    }, f = () => {
      if (!t.value) return;
      n = new N.Scene(), n.background = new N.Color(l.backgroundColor), s = new N.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1e3), s.position.set(0, 100, 200), r = new N.WebGLRenderer({ antialias: !0 }), r.setSize(window.innerWidth, window.innerHeight), t.value.appendChild(r.domElement);
      const h = new N.PlaneGeometry(l.terrainSize, l.terrainSize, l.segments, l.segments);
      h.rotateX(-Math.PI / 2), T(h);
      const m = new N.MeshStandardMaterial({ color: l.terrainColor });
      i = new N.Mesh(h, m), n.add(i);
      const w = new N.DirectionalLight(16777215, 1);
      w.position.set(500, 500, 500).normalize(), n.add(w), x();
    }, x = () => {
      if (l.enableAnimation) {
        const h = u.getElapsedTime();
        i.rotation.y += l.animationSpeed;
        const m = i.geometry.attributes.position.array;
        for (let w = 0; w < m.length; w += 3)
          m[w + 1] = Math.sin(h + m[w] * 0.01 + m[w + 2] * 0.01) * 2;
        i.geometry.attributes.position.needsUpdate = !0;
      }
      r.render(n, s), o = requestAnimationFrame(x);
    }, g = async (h) => {
      Object.assign(l, h), n.clear(), await Y(), f();
    };
    return oe(async () => {
      await Y(), f();
    }), ae(() => {
      cancelAnimationFrame(o), r.dispose();
    }), e({ updateSettings: g }), { threeContainer: t, downloadTerrain: d };
  }
}), et = (a, e) => {
  const t = a.__vccOpts || a;
  for (const [n, s] of e)
    t[n] = s;
  return t;
}, tt = {
  ref: "threeContainer",
  style: { width: "100%", height: "100vh" }
};
function st(a, e, t, n, s, r) {
  return le(), ce("div", null, [
    K("button", {
      onClick: e[0] || (e[0] = (...i) => a.downloadTerrain && a.downloadTerrain(...i))
    }, "Generate & Download Terrain"),
    K("div", tt, null, 512)
  ]);
}
const ot = /* @__PURE__ */ et(Qe, [["render", st]]);
export {
  ot as default
};
