import { defineComponent as se, ref as ne, onMounted as ie, onUnmounted as re, createElementBlock as oe, openBlock as ae, createElementVNode as Y } from "vue";
import * as S from "three";
import { Color as ce, Matrix4 as $, Vector3 as z, Quaternion as le, BufferAttribute as L, REVISION as ue, CompressedTexture as P, Source as fe, NoColorSpace as he, MathUtils as V, RGBAFormat as pe, DoubleSide as de, PropertyBinding as B, InterpolateDiscrete as xe, Scene as K, SRGBColorSpace as ge, NearestFilter as ye, NearestMipmapNearestFilter as Te, NearestMipmapLinearFilter as we, LinearFilter as me, LinearMipmapNearestFilter as Me, LinearMipmapLinearFilter as Ae, ClampToEdgeWrapping as Ee, RepeatWrapping as Ie, MirroredRepeatWrapping as Re, InterpolateLinear as be } from "three";
import Ne from "simplex-noise";
const W = {
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
      return new Be(e);
    }), this.register(function(e) {
      return new Ge(e);
    }), this.register(function(e) {
      return new He(e);
    }), this.register(function(e) {
      return new Ve(e);
    }), this.register(function(e) {
      return new je(e);
    }), this.register(function(e) {
      return new Ye(e);
    }), this.register(function(e) {
      return new De(e);
    }), this.register(function(e) {
      return new Pe(e);
    }), this.register(function(e) {
      return new ke(e);
    }), this.register(function(e) {
      return new Ke(e);
    }), this.register(function(e) {
      return new We(e);
    }), this.register(function(e) {
      return new qe(e);
    }), this.register(function(e) {
      return new Xe(e);
    }), this.register(function(e) {
      return new Je(e);
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
    const i = new ze(), r = [];
    for (let o = 0, c = this.pluginCallbacks.length; o < c; o++)
      r.push(this.pluginCallbacks[o](i));
    i.setPlugins(r), i.setTextureUtils(this.textureUtils), i.writeAsync(e, t, s).catch(n);
  }
  parseAsync(e, t) {
    const n = this;
    return new Promise(function(s, i) {
      n.parse(e, s, i, t);
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
}, k = "KHR_mesh_quantization", b = {};
b[ye] = y.NEAREST;
b[Te] = y.NEAREST_MIPMAP_NEAREST;
b[we] = y.NEAREST_MIPMAP_LINEAR;
b[me] = y.LINEAR;
b[Me] = y.LINEAR_MIPMAP_NEAREST;
b[Ae] = y.LINEAR_MIPMAP_LINEAR;
b[Ee] = y.CLAMP_TO_EDGE;
b[Ie] = y.REPEAT;
b[Re] = y.MIRRORED_REPEAT;
const q = {
  scale: "scale",
  position: "translation",
  quaternion: "rotation",
  morphTargetInfluences: "weights"
}, Se = new ce(), X = 12, Le = 1179937895, _e = 2, J = 8, Ce = 1313821514, Ue = 5130562;
function O(a, e) {
  return a.length === e.length && a.every(function(t, n) {
    return t === e[n];
  });
}
function Fe(a) {
  return new TextEncoder().encode(a).buffer;
}
function Oe(a) {
  return O(a.elements, [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
}
function ve(a, e, t) {
  const n = {
    min: new Array(a.itemSize).fill(Number.POSITIVE_INFINITY),
    max: new Array(a.itemSize).fill(Number.NEGATIVE_INFINITY)
  };
  for (let s = e; s < e + t; s++)
    for (let i = 0; i < a.itemSize; i++) {
      let r;
      a.itemSize > 4 ? r = a.array[s * a.itemSize + i] : (i === 0 ? r = a.getX(s) : i === 1 ? r = a.getY(s) : i === 2 ? r = a.getZ(s) : i === 3 && (r = a.getW(s)), a.normalized === !0 && (r = V.normalize(r, a.array))), n.min[i] = Math.min(n.min[i], r), n.max[i] = Math.max(n.max[i], r);
    }
  return n;
}
function ee(a) {
  return Math.ceil(a / 4) * 4;
}
function H(a, e = 0) {
  const t = ee(a.byteLength);
  if (t !== a.byteLength) {
    const n = new Uint8Array(t);
    if (n.set(new Uint8Array(a)), e !== 0)
      for (let s = a.byteLength; s < t; s++)
        n[s] = e;
    return n.buffer;
  }
  return a;
}
function Z() {
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
class ze {
  constructor() {
    this.plugins = [], this.options = {}, this.pending = [], this.buffers = [], this.byteOffset = 0, this.buffers = [], this.nodeMap = /* @__PURE__ */ new Map(), this.skins = [], this.extensionsUsed = {}, this.extensionsRequired = {}, this.uids = /* @__PURE__ */ new Map(), this.uid = 0, this.json = {
      asset: {
        version: "2.0",
        generator: "THREE.GLTFExporter r" + ue
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
    const s = this, i = s.buffers, r = s.json;
    n = s.options;
    const o = s.extensionsUsed, c = s.extensionsRequired, f = new Blob(i, { type: "application/octet-stream" }), x = Object.keys(o), u = Object.keys(c);
    if (x.length > 0 && (r.extensionsUsed = x), u.length > 0 && (r.extensionsRequired = u), r.buffers && r.buffers.length > 0 && (r.buffers[0].byteLength = f.size), n.binary === !0) {
      const T = new FileReader();
      T.readAsArrayBuffer(f), T.onloadend = function() {
        const l = H(T.result), p = new DataView(new ArrayBuffer(J));
        p.setUint32(0, l.byteLength, !0), p.setUint32(4, Ue, !0);
        const h = H(Fe(JSON.stringify(r)), 32), d = new DataView(new ArrayBuffer(J));
        d.setUint32(0, h.byteLength, !0), d.setUint32(4, Ce, !0);
        const w = new ArrayBuffer(X), E = new DataView(w);
        E.setUint32(0, Le, !0), E.setUint32(4, _e, !0);
        const v = X + d.byteLength + h.byteLength + p.byteLength + l.byteLength;
        E.setUint32(8, v, !0);
        const g = new Blob([
          w,
          d,
          h,
          p,
          l
        ], { type: "application/octet-stream" }), m = new FileReader();
        m.readAsArrayBuffer(g), m.onloadend = function() {
          t(m.result);
        };
      };
    } else if (r.buffers && r.buffers.length > 0) {
      const T = new FileReader();
      T.readAsDataURL(f), T.onloadend = function() {
        const l = T.result;
        r.buffers[0].uri = l, t(r);
      };
    } else
      t(r);
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
      const i = JSON.parse(JSON.stringify(e.userData));
      if (n.includeCustomExtensions && i.gltfExtensions) {
        t.extensions === void 0 && (t.extensions = {});
        for (const r in i.gltfExtensions)
          t.extensions[r] = i.gltfExtensions[r], s[r] = !0;
        delete i.gltfExtensions;
      }
      Object.keys(i).length > 0 && (t.extras = i);
    } catch (i) {
      console.warn("THREE.GLTFExporter: userData of '" + e.name + "' won't be serialized because of JSON.stringify error - " + i.message);
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
    for (let s = 0, i = e.count; s < i; s++)
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
    for (let i = 0, r = n.count; i < r; i++)
      s.fromBufferAttribute(n, i), s.x === 0 && s.y === 0 && s.z === 0 ? s.setX(1) : s.normalize(), n.setXYZ(i, s.x, s.y, s.z);
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
    function n(l) {
      return l.colorSpace === ge ? function(h) {
        return h < 0.04045 ? h * 0.0773993808 : Math.pow(h * 0.9478672986 + 0.0521327014, 2.4);
      } : function(h) {
        return h;
      };
    }
    e instanceof P && (e = await this.decompressTextureAsync(e)), t instanceof P && (t = await this.decompressTextureAsync(t));
    const s = e ? e.image : null, i = t ? t.image : null, r = Math.max(s ? s.width : 0, i ? i.width : 0), o = Math.max(s ? s.height : 0, i ? i.height : 0), c = Z();
    c.width = r, c.height = o;
    const f = c.getContext("2d", {
      willReadFrequently: !0
    });
    f.fillStyle = "#00ffff", f.fillRect(0, 0, r, o);
    const x = f.getImageData(0, 0, r, o);
    if (s) {
      f.drawImage(s, 0, 0, r, o);
      const l = n(e), p = f.getImageData(0, 0, r, o).data;
      for (let h = 2; h < p.length; h += 4)
        x.data[h] = l(p[h] / 256) * 256;
    }
    if (i) {
      f.drawImage(i, 0, 0, r, o);
      const l = n(t), p = f.getImageData(0, 0, r, o).data;
      for (let h = 1; h < p.length; h += 4)
        x.data[h] = l(p[h] / 256) * 256;
    }
    f.putImageData(x, 0, 0);
    const T = (e || t).clone();
    return T.source = new fe(c), T.colorSpace = he, T.channel = (e || t).channel, e && t && e.channel !== t.channel && console.warn("THREE.GLTFExporter: UV channels for metalnessMap and roughnessMap textures must match."), console.warn("THREE.GLTFExporter: Merged metalnessMap and roughnessMap textures."), T;
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
  processBufferView(e, t, n, s, i) {
    const r = this.json;
    r.bufferViews || (r.bufferViews = []);
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
    i === y.ARRAY_BUFFER && (c = Math.ceil(c / 4) * 4);
    const f = ee(s * c), x = new DataView(new ArrayBuffer(f));
    let u = 0;
    for (let p = n; p < n + s; p++) {
      for (let h = 0; h < e.itemSize; h++) {
        let d;
        e.itemSize > 4 ? d = e.array[p * e.itemSize + h] : (h === 0 ? d = e.getX(p) : h === 1 ? d = e.getY(p) : h === 2 ? d = e.getZ(p) : h === 3 && (d = e.getW(p)), e.normalized === !0 && (d = V.normalize(d, e.array))), t === y.FLOAT ? x.setFloat32(u, d, !0) : t === y.INT ? x.setInt32(u, d, !0) : t === y.UNSIGNED_INT ? x.setUint32(u, d, !0) : t === y.SHORT ? x.setInt16(u, d, !0) : t === y.UNSIGNED_SHORT ? x.setUint16(u, d, !0) : t === y.BYTE ? x.setInt8(u, d) : t === y.UNSIGNED_BYTE && x.setUint8(u, d), u += o;
      }
      u % c !== 0 && (u += c - u % c);
    }
    const T = {
      buffer: this.processBuffer(x.buffer),
      byteOffset: this.byteOffset,
      byteLength: f
    };
    return i !== void 0 && (T.target = i), i === y.ARRAY_BUFFER && (T.byteStride = c), this.byteOffset += f, r.bufferViews.push(T), {
      id: r.bufferViews.length - 1,
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
      const i = new FileReader();
      i.readAsArrayBuffer(e), i.onloadend = function() {
        const r = H(i.result), o = {
          buffer: t.processBuffer(r),
          byteOffset: t.byteOffset,
          byteLength: r.byteLength
        };
        t.byteOffset += r.byteLength, s(n.bufferViews.push(o) - 1);
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
    const i = this.json, r = {
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
    const c = ve(e, n, s);
    let f;
    t !== void 0 && (f = e === t.index ? y.ELEMENT_ARRAY_BUFFER : y.ARRAY_BUFFER);
    const x = this.processBufferView(e, o, n, s, f), u = {
      bufferView: x.id,
      byteOffset: x.byteOffset,
      componentType: o,
      count: s,
      max: c.max,
      min: c.min,
      type: r[e.itemSize]
    };
    return e.normalized === !0 && (u.normalized = !0), i.accessors || (i.accessors = []), i.accessors.push(u) - 1;
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
      const i = this, r = i.cache, o = i.json, c = i.options, f = i.pending;
      r.images.has(e) || r.images.set(e, {});
      const x = r.images.get(e), u = s + ":flipY/" + n.toString();
      if (x[u] !== void 0) return x[u];
      o.images || (o.images = []);
      const T = { mimeType: s }, l = Z();
      l.width = Math.min(e.width, c.maxTextureSize), l.height = Math.min(e.height, c.maxTextureSize);
      const p = l.getContext("2d", {
        willReadFrequently: !0
      });
      if (n === !0 && (p.translate(0, l.height), p.scale(1, -1)), e.data !== void 0) {
        t !== pe && console.error("GLTFExporter: Only RGBAFormat is supported.", t), (e.width > c.maxTextureSize || e.height > c.maxTextureSize) && console.warn("GLTFExporter: Image size is bigger than maxTextureSize", e);
        const d = new Uint8ClampedArray(e.height * e.width * 4);
        for (let w = 0; w < d.length; w += 4)
          d[w + 0] = e.data[w + 0], d[w + 1] = e.data[w + 1], d[w + 2] = e.data[w + 2], d[w + 3] = e.data[w + 3];
        p.putImageData(new ImageData(d, e.width, e.height), 0, 0);
      } else if (typeof HTMLImageElement < "u" && e instanceof HTMLImageElement || typeof HTMLCanvasElement < "u" && e instanceof HTMLCanvasElement || typeof ImageBitmap < "u" && e instanceof ImageBitmap || typeof OffscreenCanvas < "u" && e instanceof OffscreenCanvas)
        p.drawImage(e, 0, 0, l.width, l.height);
      else
        throw new Error("THREE.GLTFExporter: Invalid image type. Use HTMLImageElement, HTMLCanvasElement, ImageBitmap or OffscreenCanvas.");
      c.binary === !0 ? f.push(
        Q(l, s).then((d) => i.processBufferViewImage(d)).then((d) => {
          T.bufferView = d;
        })
      ) : l.toDataURL !== void 0 ? T.uri = l.toDataURL(s) : f.push(
        Q(l, s).then((d) => new FileReader().readAsDataURL(d)).then((d) => {
          T.uri = d;
        })
      );
      const h = o.images.push(T) - 1;
      return x[u] = h, h;
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
    const n = this.options, s = this.cache, i = this.json;
    if (s.textures.has(e)) return s.textures.get(e);
    i.textures || (i.textures = []), e instanceof P && (e = await this.decompressTextureAsync(e, n.maxTextureSize));
    let r = e.userData.mimeType;
    r === "image/webp" && (r = "image/png");
    const o = {
      sampler: this.processSampler(e),
      source: this.processImage(e.image, e.format, e.flipY, r)
    };
    e.name && (o.name = e.name), await this._invokeAllAsync(async function(f) {
      f.writeTexture && await f.writeTexture(e, o);
    });
    const c = i.textures.push(o) - 1;
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
    const i = e.color.toArray().concat([e.opacity]);
    if (O(i, [1, 1, 1, 1]) || (s.pbrMetallicRoughness.baseColorFactor = i), e.isMeshStandardMaterial ? (s.pbrMetallicRoughness.metallicFactor = e.metalness, s.pbrMetallicRoughness.roughnessFactor = e.roughness) : (s.pbrMetallicRoughness.metallicFactor = 0, s.pbrMetallicRoughness.roughnessFactor = 1), e.metalnessMap || e.roughnessMap) {
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
        const f = {
          index: await this.processTextureAsync(e.emissiveMap),
          texCoord: e.emissiveMap.channel
        };
        this.applyTextureTransform(f, e.emissiveMap), s.emissiveTexture = f;
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
    e.transparent ? s.alphaMode = "BLEND" : e.alphaTest > 0 && (s.alphaMode = "MASK", s.alphaCutoff = e.alphaTest), e.side === de && (s.doubleSided = !0), e.name !== "" && (s.name = e.name), this.serializeUserData(e, s), await this._invokeAllAsync(async function(o) {
      o.writeMaterialAsync && await o.writeMaterialAsync(e, s);
    });
    const r = n.materials.push(s) - 1;
    return t.materials.set(e, r), r;
  }
  /**
   * Process mesh
   * @param  {THREE.Mesh} mesh Mesh to process
   * @return {Promise<number|null>} Index of the processed mesh in the "meshes" array
   */
  async processMeshAsync(e) {
    const t = this.cache, n = this.json, s = [e.geometry.uuid];
    if (Array.isArray(e.material))
      for (let g = 0, m = e.material.length; g < m; g++)
        s.push(e.material[g].uuid);
    else
      s.push(e.material.uuid);
    const i = s.join(":");
    if (t.meshes.has(i)) return t.meshes.get(i);
    const r = e.geometry;
    let o;
    e.isLineSegments ? o = y.LINES : e.isLineLoop ? o = y.LINE_LOOP : e.isLine ? o = y.LINE_STRIP : e.isPoints ? o = y.POINTS : o = e.material.wireframe ? y.LINES : y.TRIANGLES;
    const c = {}, f = {}, x = [], u = [], T = {
      uv: "TEXCOORD_0",
      uv1: "TEXCOORD_1",
      uv2: "TEXCOORD_2",
      uv3: "TEXCOORD_3",
      color: "COLOR_0",
      skinWeight: "WEIGHTS_0",
      skinIndex: "JOINTS_0"
    }, l = r.getAttribute("normal");
    l !== void 0 && !this.isNormalizedNormalAttribute(l) && (console.warn("THREE.GLTFExporter: Creating normalized normal attribute from the non-normalized one."), r.setAttribute("normal", this.createNormalizedNormalAttribute(l)));
    let p = null;
    for (let g in r.attributes) {
      if (g.slice(0, 5) === "morph") continue;
      const m = r.attributes[g];
      if (g = T[g] || g.toUpperCase(), /^(POSITION|NORMAL|TANGENT|TEXCOORD_\d+|COLOR_\d+|JOINTS_\d+|WEIGHTS_\d+)$/.test(g) || (g = "_" + g), t.attributes.has(this.getUID(m))) {
        f[g] = t.attributes.get(this.getUID(m));
        continue;
      }
      p = null;
      const M = m.array;
      g === "JOINTS_0" && !(M instanceof Uint16Array) && !(M instanceof Uint8Array) ? (console.warn('GLTFExporter: Attribute "skinIndex" converted to type UNSIGNED_SHORT.'), p = new L(new Uint16Array(M), m.itemSize, m.normalized)) : (M instanceof Uint32Array || M instanceof Int32Array) && !g.startsWith("_") && (console.warn(`GLTFExporter: Attribute "${g}" converted to type FLOAT.`), p = G.Utils.toFloat32BufferAttribute(m));
      const R = this.processAccessor(p || m, r);
      R !== null && (g.startsWith("_") || this.detectMeshQuantization(g, m), f[g] = R, t.attributes.set(this.getUID(m), R));
    }
    if (l !== void 0 && r.setAttribute("normal", l), Object.keys(f).length === 0) return null;
    if (e.morphTargetInfluences !== void 0 && e.morphTargetInfluences.length > 0) {
      const g = [], m = [], A = {};
      if (e.morphTargetDictionary !== void 0)
        for (const M in e.morphTargetDictionary)
          A[e.morphTargetDictionary[M]] = M;
      for (let M = 0; M < e.morphTargetInfluences.length; ++M) {
        const R = {};
        let j = !1;
        for (const C in r.morphAttributes) {
          if (C !== "position" && C !== "normal") {
            j || (console.warn("GLTFExporter: Only POSITION and NORMAL morph are supported."), j = !0);
            continue;
          }
          const N = r.morphAttributes[C][M], D = C.toUpperCase(), U = r.attributes[C];
          if (t.attributes.has(this.getUID(N, !0))) {
            R[D] = t.attributes.get(this.getUID(N, !0));
            continue;
          }
          const F = N.clone();
          if (!r.morphTargetsRelative)
            for (let I = 0, te = N.count; I < te; I++)
              for (let _ = 0; _ < N.itemSize; _++)
                _ === 0 && F.setX(I, N.getX(I) - U.getX(I)), _ === 1 && F.setY(I, N.getY(I) - U.getY(I)), _ === 2 && F.setZ(I, N.getZ(I) - U.getZ(I)), _ === 3 && F.setW(I, N.getW(I) - U.getW(I));
          R[D] = this.processAccessor(F, r), t.attributes.set(this.getUID(U, !0), R[D]);
        }
        u.push(R), g.push(e.morphTargetInfluences[M]), e.morphTargetDictionary !== void 0 && m.push(A[M]);
      }
      c.weights = g, m.length > 0 && (c.extras = {}, c.extras.targetNames = m);
    }
    const h = Array.isArray(e.material);
    if (h && r.groups.length === 0) return null;
    let d = !1;
    if (h && r.index === null) {
      const g = [];
      for (let m = 0, A = r.attributes.position.count; m < A; m++)
        g[m] = m;
      r.setIndex(g), d = !0;
    }
    const w = h ? e.material : [e.material], E = h ? r.groups : [{ materialIndex: 0, start: void 0, count: void 0 }];
    for (let g = 0, m = E.length; g < m; g++) {
      const A = {
        mode: o,
        attributes: f
      };
      if (this.serializeUserData(r, A), u.length > 0 && (A.targets = u), r.index !== null) {
        let R = this.getUID(r.index);
        (E[g].start !== void 0 || E[g].count !== void 0) && (R += ":" + E[g].start + ":" + E[g].count), t.attributes.has(R) ? A.indices = t.attributes.get(R) : (A.indices = this.processAccessor(r.index, r, E[g].start, E[g].count), t.attributes.set(R, A.indices)), A.indices === null && delete A.indices;
      }
      const M = await this.processMaterialAsync(w[E[g].materialIndex]);
      M !== null && (A.material = M), x.push(A);
    }
    d === !0 && r.setIndex(null), c.primitives = x, n.meshes || (n.meshes = []), await this._invokeAllAsync(function(g) {
      g.writeMesh && g.writeMesh(e, c);
    });
    const v = n.meshes.push(c) - 1;
    return t.meshes.set(i, v), v;
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
    if (this.extensionsUsed[k]) return;
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
    W[s] && W[s].includes(n) && (this.extensionsUsed[k] = !0, this.extensionsRequired[k] = !0);
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
    const i = e.tracks, r = [], o = [];
    for (let c = 0; c < i.length; ++c) {
      const f = i[c], x = B.parseTrackName(f.name);
      let u = B.findNode(t, x.nodeName);
      const T = q[x.propertyName];
      if (x.objectName === "bones" && (u.isSkinnedMesh === !0 ? u = u.skeleton.getBoneByName(x.objectIndex) : u = void 0), !u || !T) {
        console.warn('THREE.GLTFExporter: Could not export animation track "%s".', f.name);
        continue;
      }
      const l = 1;
      let p = f.values.length / f.times.length;
      T === q.morphTargetInfluences && (p /= u.morphTargetInfluences.length);
      let h;
      f.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline === !0 ? (h = "CUBICSPLINE", p /= 3) : f.getInterpolation() === xe ? h = "STEP" : h = "LINEAR", o.push({
        input: this.processAccessor(new L(f.times, l)),
        output: this.processAccessor(new L(f.values, p)),
        interpolation: h
      }), r.push({
        sampler: o.length - 1,
        target: {
          node: s.get(u),
          path: T
        }
      });
    }
    return n.animations.push({
      name: e.name || "clip_" + n.animations.length,
      samplers: o,
      channels: r
    }), n.animations.length - 1;
  }
  /**
   * @param {THREE.Object3D} object
   * @return {number|null}
   */
  processSkin(e) {
    const t = this.json, n = this.nodeMap, s = t.nodes[n.get(e)], i = e.skeleton;
    if (i === void 0) return null;
    const r = e.skeleton.bones[0];
    if (r === void 0) return null;
    const o = [], c = new Float32Array(i.bones.length * 16), f = new $();
    for (let u = 0; u < i.bones.length; ++u)
      o.push(n.get(i.bones[u])), f.copy(i.boneInverses[u]), f.multiply(e.bindMatrix).toArray(c, u * 16);
    return t.skins === void 0 && (t.skins = []), t.skins.push({
      inverseBindMatrices: this.processAccessor(new L(c, 16)),
      joints: o,
      skeleton: n.get(r)
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
    const i = {};
    if (n.trs) {
      const o = e.quaternion.toArray(), c = e.position.toArray(), f = e.scale.toArray();
      O(o, [0, 0, 0, 1]) || (i.rotation = o), O(c, [0, 0, 0]) || (i.translation = c), O(f, [1, 1, 1]) || (i.scale = f);
    } else
      e.matrixAutoUpdate && e.updateMatrix(), Oe(e.matrix) === !1 && (i.matrix = e.matrix.elements);
    if (e.name !== "" && (i.name = String(e.name)), this.serializeUserData(e, i), e.isMesh || e.isLine || e.isPoints) {
      const o = await this.processMeshAsync(e);
      o !== null && (i.mesh = o);
    } else e.isCamera && (i.camera = this.processCamera(e));
    if (e.isSkinnedMesh && this.skins.push(e), e.children.length > 0) {
      const o = [];
      for (let c = 0, f = e.children.length; c < f; c++) {
        const x = e.children[c];
        if (x.visible || n.onlyVisible === !1) {
          const u = await this.processNodeAsync(x);
          u !== null && o.push(u);
        }
      }
      o.length > 0 && (i.children = o);
    }
    await this._invokeAllAsync(function(o) {
      o.writeNode && o.writeNode(e, i);
    });
    const r = t.nodes.push(i) - 1;
    return s.set(e, r), r;
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
    const i = [];
    for (let r = 0, o = e.children.length; r < o; r++) {
      const c = e.children[r];
      if (c.visible || n.onlyVisible === !1) {
        const f = await this.processNodeAsync(c);
        f !== null && i.push(f);
      }
    }
    i.length > 0 && (s.nodes = i), this.serializeUserData(e, s);
  }
  /**
   * Creates a Scene to hold a list of objects and parse it
   * @param  {Array<THREE.Object3D>} objects List of objects to process
   */
  async processObjectsAsync(e) {
    const t = new K();
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
      e[s] instanceof K ? await this.processSceneAsync(e[s]) : n.push(e[s]);
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
class Be {
  constructor(e) {
    this.writer = e, this.name = "KHR_lights_punctual";
  }
  writeNode(e, t) {
    if (!e.isLight) return;
    if (!e.isDirectionalLight && !e.isPointLight && !e.isSpotLight) {
      console.warn("THREE.GLTFExporter: Only directional, point, and spot lights are supported.", e);
      return;
    }
    const n = this.writer, s = n.json, i = n.extensionsUsed, r = {};
    e.name && (r.name = e.name), r.color = e.color.toArray(), r.intensity = e.intensity, e.isDirectionalLight ? r.type = "directional" : e.isPointLight ? (r.type = "point", e.distance > 0 && (r.range = e.distance)) : e.isSpotLight && (r.type = "spot", e.distance > 0 && (r.range = e.distance), r.spot = {}, r.spot.innerConeAngle = (1 - e.penumbra) * e.angle, r.spot.outerConeAngle = e.angle), e.decay !== void 0 && e.decay !== 2 && console.warn("THREE.GLTFExporter: Light decay may be lost. glTF is physically-based, and expects light.decay=2."), e.target && (e.target.parent !== e || e.target.position.x !== 0 || e.target.position.y !== 0 || e.target.position.z !== -1) && console.warn("THREE.GLTFExporter: Light direction may be lost. For best results, make light.target a child of the light with position 0,0,-1."), i[this.name] || (s.extensions = s.extensions || {}, s.extensions[this.name] = { lights: [] }, i[this.name] = !0);
    const o = s.extensions[this.name].lights;
    o.push(r), t.extensions = t.extensions || {}, t.extensions[this.name] = { light: o.length - 1 };
  }
}
class Ge {
  constructor(e) {
    this.writer = e, this.name = "KHR_materials_unlit";
  }
  async writeMaterialAsync(e, t) {
    if (!e.isMeshBasicMaterial) return;
    const s = this.writer.extensionsUsed;
    t.extensions = t.extensions || {}, t.extensions[this.name] = {}, s[this.name] = !0, t.pbrMetallicRoughness.metallicFactor = 0, t.pbrMetallicRoughness.roughnessFactor = 0.9;
  }
}
class De {
  constructor(e) {
    this.writer = e, this.name = "KHR_materials_clearcoat";
  }
  async writeMaterialAsync(e, t) {
    if (!e.isMeshPhysicalMaterial || e.clearcoat === 0) return;
    const n = this.writer, s = n.extensionsUsed, i = {};
    if (i.clearcoatFactor = e.clearcoat, e.clearcoatMap) {
      const r = {
        index: await n.processTextureAsync(e.clearcoatMap),
        texCoord: e.clearcoatMap.channel
      };
      n.applyTextureTransform(r, e.clearcoatMap), i.clearcoatTexture = r;
    }
    if (i.clearcoatRoughnessFactor = e.clearcoatRoughness, e.clearcoatRoughnessMap) {
      const r = {
        index: await n.processTextureAsync(e.clearcoatRoughnessMap),
        texCoord: e.clearcoatRoughnessMap.channel
      };
      n.applyTextureTransform(r, e.clearcoatRoughnessMap), i.clearcoatRoughnessTexture = r;
    }
    if (e.clearcoatNormalMap) {
      const r = {
        index: await n.processTextureAsync(e.clearcoatNormalMap),
        texCoord: e.clearcoatNormalMap.channel
      };
      e.clearcoatNormalScale.x !== 1 && (r.scale = e.clearcoatNormalScale.x), n.applyTextureTransform(r, e.clearcoatNormalMap), i.clearcoatNormalTexture = r;
    }
    t.extensions = t.extensions || {}, t.extensions[this.name] = i, s[this.name] = !0;
  }
}
class Pe {
  constructor(e) {
    this.writer = e, this.name = "KHR_materials_dispersion";
  }
  async writeMaterialAsync(e, t) {
    if (!e.isMeshPhysicalMaterial || e.dispersion === 0) return;
    const s = this.writer.extensionsUsed, i = {};
    i.dispersion = e.dispersion, t.extensions = t.extensions || {}, t.extensions[this.name] = i, s[this.name] = !0;
  }
}
class ke {
  constructor(e) {
    this.writer = e, this.name = "KHR_materials_iridescence";
  }
  async writeMaterialAsync(e, t) {
    if (!e.isMeshPhysicalMaterial || e.iridescence === 0) return;
    const n = this.writer, s = n.extensionsUsed, i = {};
    if (i.iridescenceFactor = e.iridescence, e.iridescenceMap) {
      const r = {
        index: await n.processTextureAsync(e.iridescenceMap),
        texCoord: e.iridescenceMap.channel
      };
      n.applyTextureTransform(r, e.iridescenceMap), i.iridescenceTexture = r;
    }
    if (i.iridescenceIor = e.iridescenceIOR, i.iridescenceThicknessMinimum = e.iridescenceThicknessRange[0], i.iridescenceThicknessMaximum = e.iridescenceThicknessRange[1], e.iridescenceThicknessMap) {
      const r = {
        index: await n.processTextureAsync(e.iridescenceThicknessMap),
        texCoord: e.iridescenceThicknessMap.channel
      };
      n.applyTextureTransform(r, e.iridescenceThicknessMap), i.iridescenceThicknessTexture = r;
    }
    t.extensions = t.extensions || {}, t.extensions[this.name] = i, s[this.name] = !0;
  }
}
class He {
  constructor(e) {
    this.writer = e, this.name = "KHR_materials_transmission";
  }
  async writeMaterialAsync(e, t) {
    if (!e.isMeshPhysicalMaterial || e.transmission === 0) return;
    const n = this.writer, s = n.extensionsUsed, i = {};
    if (i.transmissionFactor = e.transmission, e.transmissionMap) {
      const r = {
        index: await n.processTextureAsync(e.transmissionMap),
        texCoord: e.transmissionMap.channel
      };
      n.applyTextureTransform(r, e.transmissionMap), i.transmissionTexture = r;
    }
    t.extensions = t.extensions || {}, t.extensions[this.name] = i, s[this.name] = !0;
  }
}
class Ve {
  constructor(e) {
    this.writer = e, this.name = "KHR_materials_volume";
  }
  async writeMaterialAsync(e, t) {
    if (!e.isMeshPhysicalMaterial || e.transmission === 0) return;
    const n = this.writer, s = n.extensionsUsed, i = {};
    if (i.thicknessFactor = e.thickness, e.thicknessMap) {
      const r = {
        index: await n.processTextureAsync(e.thicknessMap),
        texCoord: e.thicknessMap.channel
      };
      n.applyTextureTransform(r, e.thicknessMap), i.thicknessTexture = r;
    }
    e.attenuationDistance !== 1 / 0 && (i.attenuationDistance = e.attenuationDistance), i.attenuationColor = e.attenuationColor.toArray(), t.extensions = t.extensions || {}, t.extensions[this.name] = i, s[this.name] = !0;
  }
}
class je {
  constructor(e) {
    this.writer = e, this.name = "KHR_materials_ior";
  }
  async writeMaterialAsync(e, t) {
    if (!e.isMeshPhysicalMaterial || e.ior === 1.5) return;
    const s = this.writer.extensionsUsed, i = {};
    i.ior = e.ior, t.extensions = t.extensions || {}, t.extensions[this.name] = i, s[this.name] = !0;
  }
}
class Ye {
  constructor(e) {
    this.writer = e, this.name = "KHR_materials_specular";
  }
  async writeMaterialAsync(e, t) {
    if (!e.isMeshPhysicalMaterial || e.specularIntensity === 1 && e.specularColor.equals(Se) && !e.specularIntensityMap && !e.specularColorMap) return;
    const n = this.writer, s = n.extensionsUsed, i = {};
    if (e.specularIntensityMap) {
      const r = {
        index: await n.processTextureAsync(e.specularIntensityMap),
        texCoord: e.specularIntensityMap.channel
      };
      n.applyTextureTransform(r, e.specularIntensityMap), i.specularTexture = r;
    }
    if (e.specularColorMap) {
      const r = {
        index: await n.processTextureAsync(e.specularColorMap),
        texCoord: e.specularColorMap.channel
      };
      n.applyTextureTransform(r, e.specularColorMap), i.specularColorTexture = r;
    }
    i.specularFactor = e.specularIntensity, i.specularColorFactor = e.specularColor.toArray(), t.extensions = t.extensions || {}, t.extensions[this.name] = i, s[this.name] = !0;
  }
}
class Ke {
  constructor(e) {
    this.writer = e, this.name = "KHR_materials_sheen";
  }
  async writeMaterialAsync(e, t) {
    if (!e.isMeshPhysicalMaterial || e.sheen == 0) return;
    const n = this.writer, s = n.extensionsUsed, i = {};
    if (e.sheenRoughnessMap) {
      const r = {
        index: await n.processTextureAsync(e.sheenRoughnessMap),
        texCoord: e.sheenRoughnessMap.channel
      };
      n.applyTextureTransform(r, e.sheenRoughnessMap), i.sheenRoughnessTexture = r;
    }
    if (e.sheenColorMap) {
      const r = {
        index: await n.processTextureAsync(e.sheenColorMap),
        texCoord: e.sheenColorMap.channel
      };
      n.applyTextureTransform(r, e.sheenColorMap), i.sheenColorTexture = r;
    }
    i.sheenRoughnessFactor = e.sheenRoughness, i.sheenColorFactor = e.sheenColor.toArray(), t.extensions = t.extensions || {}, t.extensions[this.name] = i, s[this.name] = !0;
  }
}
class We {
  constructor(e) {
    this.writer = e, this.name = "KHR_materials_anisotropy";
  }
  async writeMaterialAsync(e, t) {
    if (!e.isMeshPhysicalMaterial || e.anisotropy == 0) return;
    const n = this.writer, s = n.extensionsUsed, i = {};
    if (e.anisotropyMap) {
      const r = { index: await n.processTextureAsync(e.anisotropyMap) };
      n.applyTextureTransform(r, e.anisotropyMap), i.anisotropyTexture = r;
    }
    i.anisotropyStrength = e.anisotropy, i.anisotropyRotation = e.anisotropyRotation, t.extensions = t.extensions || {}, t.extensions[this.name] = i, s[this.name] = !0;
  }
}
class qe {
  constructor(e) {
    this.writer = e, this.name = "KHR_materials_emissive_strength";
  }
  async writeMaterialAsync(e, t) {
    if (!e.isMeshStandardMaterial || e.emissiveIntensity === 1) return;
    const s = this.writer.extensionsUsed, i = {};
    i.emissiveStrength = e.emissiveIntensity, t.extensions = t.extensions || {}, t.extensions[this.name] = i, s[this.name] = !0;
  }
}
class Xe {
  constructor(e) {
    this.writer = e, this.name = "EXT_materials_bump";
  }
  async writeMaterialAsync(e, t) {
    if (!e.isMeshStandardMaterial || e.bumpScale === 1 && !e.bumpMap) return;
    const n = this.writer, s = n.extensionsUsed, i = {};
    if (e.bumpMap) {
      const r = {
        index: await n.processTextureAsync(e.bumpMap),
        texCoord: e.bumpMap.channel
      };
      n.applyTextureTransform(r, e.bumpMap), i.bumpTexture = r;
    }
    i.bumpFactor = e.bumpScale, t.extensions = t.extensions || {}, t.extensions[this.name] = i, s[this.name] = !0;
  }
}
class Je {
  constructor(e) {
    this.writer = e, this.name = "EXT_mesh_gpu_instancing";
  }
  writeNode(e, t) {
    if (!e.isInstancedMesh) return;
    const n = this.writer, s = e, i = new Float32Array(s.count * 3), r = new Float32Array(s.count * 4), o = new Float32Array(s.count * 3), c = new $(), f = new z(), x = new le(), u = new z();
    for (let l = 0; l < s.count; l++)
      s.getMatrixAt(l, c), c.decompose(f, x, u), f.toArray(i, l * 3), x.toArray(r, l * 4), u.toArray(o, l * 3);
    const T = {
      TRANSLATION: n.processAccessor(new L(i, 3)),
      ROTATION: n.processAccessor(new L(r, 4)),
      SCALE: n.processAccessor(new L(o, 3))
    };
    s.instanceColor && (T._COLOR_0 = n.processAccessor(s.instanceColor)), t.extensions = t.extensions || {}, t.extensions[this.name] = { attributes: T }, n.extensionsUsed[this.name] = !0, n.extensionsRequired[this.name] = !0;
  }
}
G.Utils = {
  insertKeyframe: function(a, e) {
    const n = a.getValueSize(), s = new a.TimeBufferType(a.times.length + 1), i = new a.ValueBufferType(a.values.length + n), r = a.createInterpolant(new a.ValueBufferType(n));
    let o;
    if (a.times.length === 0) {
      s[0] = e;
      for (let c = 0; c < n; c++)
        i[c] = 0;
      o = 0;
    } else if (e < a.times[0]) {
      if (Math.abs(a.times[0] - e) < 1e-3) return 0;
      s[0] = e, s.set(a.times, 1), i.set(r.evaluate(e), 0), i.set(a.values, n), o = 0;
    } else if (e > a.times[a.times.length - 1]) {
      if (Math.abs(a.times[a.times.length - 1] - e) < 1e-3)
        return a.times.length - 1;
      s[s.length - 1] = e, s.set(a.times, 0), i.set(a.values, 0), i.set(r.evaluate(e), a.values.length), o = s.length - 1;
    } else
      for (let c = 0; c < a.times.length; c++) {
        if (Math.abs(a.times[c] - e) < 1e-3) return c;
        if (a.times[c] < e && a.times[c + 1] > e) {
          s.set(a.times.slice(0, c + 1), 0), s[c + 1] = e, s.set(a.times.slice(c + 1), c + 2), i.set(a.values.slice(0, (c + 1) * n), 0), i.set(r.evaluate(e), (c + 1) * n), i.set(a.values.slice((c + 1) * n), (c + 2) * n), o = c + 1;
          break;
        }
      }
    return a.times = s, a.values = i, o;
  },
  mergeMorphTargetTracks: function(a, e) {
    const t = [], n = {}, s = a.tracks;
    for (let i = 0; i < s.length; ++i) {
      let r = s[i];
      const o = B.parseTrackName(r.name), c = B.findNode(e, o.nodeName);
      if (o.propertyName !== "morphTargetInfluences" || o.propertyIndex === void 0) {
        t.push(r);
        continue;
      }
      if (r.createInterpolant !== r.InterpolantFactoryMethodDiscrete && r.createInterpolant !== r.InterpolantFactoryMethodLinear) {
        if (r.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline)
          throw new Error("THREE.GLTFExporter: Cannot merge tracks with glTF CUBICSPLINE interpolation.");
        console.warn("THREE.GLTFExporter: Morph target interpolation mode not yet supported. Using LINEAR instead."), r = r.clone(), r.setInterpolation(be);
      }
      const f = c.morphTargetInfluences.length, x = c.morphTargetDictionary[o.propertyIndex];
      if (x === void 0)
        throw new Error("THREE.GLTFExporter: Morph target name not found: " + o.propertyIndex);
      let u;
      if (n[c.uuid] === void 0) {
        u = r.clone();
        const l = new u.ValueBufferType(f * u.times.length);
        for (let p = 0; p < u.times.length; p++)
          l[p * f + x] = u.values[p];
        u.name = (o.nodeName || "") + ".morphTargetInfluences", u.values = l, n[c.uuid] = u, t.push(u);
        continue;
      }
      const T = r.createInterpolant(new r.ValueBufferType(1));
      u = n[c.uuid];
      for (let l = 0; l < u.times.length; l++)
        u.values[l * f + x] = T.evaluate(u.times[l]);
      for (let l = 0; l < r.times.length; l++) {
        const p = this.insertKeyframe(u, r.times[l]);
        u.values[p * f + x] = r.values[l];
      }
    }
    return a.tracks = t, a;
  },
  toFloat32BufferAttribute: function(a) {
    const e = new L(new Float32Array(a.count * a.itemSize), a.itemSize, !1);
    if (!a.normalized && !a.isInterleavedBufferAttribute)
      return e.array.set(a.array), e;
    for (let t = 0, n = a.count; t < n; t++)
      for (let s = 0; s < a.itemSize; s++)
        e.setComponent(t, s, a.getComponent(t, s));
    return e;
  }
};
const et = /* @__PURE__ */ se({
  __name: "TerrainGenerator",
  props: {
    terrainSize: {},
    segments: {},
    heightScaling: {},
    terrainColor: {},
    backgroundColor: {},
    noiseType: {},
    texturePaths: {},
    noiseScale: {}
  },
  setup(a) {
    const e = a, t = ne(null);
    let n, s, i, r, o;
    const c = /* @__PURE__ */ new Map(), f = new Ne();
    function x(l) {
      const p = l.attributes.position.array;
      for (let h = 0; h < p.length; h += 3) {
        const d = p[h] * e.noiseScale, w = p[h + 2] * e.noiseScale, E = f.noise2D(d, w);
        p[h + 1] = E * e.heightScaling;
      }
      l.computeVertexNormals();
    }
    function u() {
      const l = new S.MeshStandardMaterial({ color: e.terrainColor });
      return Object.entries(e.texturePaths).forEach(([p, h]) => {
        if (h && !c.has(h)) {
          const w = new S.TextureLoader().load(h);
          c.set(h, w);
        }
        c.has(h) && (p === "albedo" && (l.map = c.get(h)), p === "normal" && (l.normalMap = c.get(h)), p === "roughness" && (l.roughnessMap = c.get(h)));
      }), l;
    }
    function T() {
      new G().parse(n, (p) => {
        const h = new Blob([JSON.stringify(p)], { type: "application/json" }), d = URL.createObjectURL(h), w = document.createElement("a");
        w.style.display = "none", w.href = d, w.download = "random_terrain.gltf", document.body.appendChild(w), w.click(), document.body.removeChild(w);
      });
    }
    return ie(() => {
      var w;
      n = new S.Scene(), n.background = new S.Color(e.backgroundColor), s = new S.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1e3), s.position.set(0, 100, 200), i = new S.WebGLRenderer({ antialias: !0 }), i.setSize(window.innerWidth, window.innerHeight), (w = t.value) == null || w.appendChild(i.domElement);
      const l = new S.PlaneGeometry(e.terrainSize, e.terrainSize, e.segments, e.segments);
      l.rotateX(-Math.PI / 2), x(l);
      const p = u();
      r = new S.Mesh(l, p), n.add(r);
      const h = new S.DirectionalLight(16777215, 1);
      h.position.set(500, 500, 500).normalize(), n.add(h);
      function d() {
        o = requestAnimationFrame(d), i.render(n, s);
      }
      d();
    }), re(() => {
      cancelAnimationFrame(o), i.dispose(), c.clear();
    }), (l, p) => (ae(), oe("div", null, [
      Y("button", { onClick: T }, "Generate & Download Terrain"),
      Y("div", {
        ref_key: "threeContainer",
        ref: t,
        style: { width: "100%", height: "100vh" }
      }, null, 512)
    ]));
  }
});
export {
  et as default
};
