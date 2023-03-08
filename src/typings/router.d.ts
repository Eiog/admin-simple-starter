import type{ Component } from 'vue';
import 'vue-router';
declare module 'vue-router' {
  interface RouteMeta {
    title?: string;
    description?: string;
    icon?: string;
    requiresAuth?: boolean;
    menuGroupKey?:string
    menuGroupLabel?:string
    access?: number[];
    badge?: number;
    hidden?: boolean;
    sort?: number;
    root?: boolean;
    keepAlive?: boolean;
  }
}
