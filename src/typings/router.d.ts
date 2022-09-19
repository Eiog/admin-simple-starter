import { Component } from 'vue';
import { _RouteLocationBase } from 'vue-router';
declare module 'vue-router' {
  interface RouteMeta {
    title?: string;
    description?: string;
    icon?: Component;
    requiresAuth?: boolean;
    access?: number;
    badge?: string | number;
    show: boolean;
    sort: number;
    root?: boolean;
    keepAlive?: boolean;
  }
}
