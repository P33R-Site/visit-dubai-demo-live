'use client';

import React, { useState, useCallback, useMemo } from 'react';
import { TripPlanItem } from '@/lib/types';
import PlanItemCard from './PlanItemCard';

interface PlanItemsContainerProps {
    className?: string;
    maxItems?: number;
}

/**
 * Container component for displaying incremental plan items
 * Handles deduplication and smooth animations
 */
export function PlanItemsContainer({
    className = '',
    maxItems = 20
}: PlanItemsContainerProps) {
    const [items, setItems] = useState<TripPlanItem[]>([]);
    const [displayedIds] = useState<Set<string>>(new Set());

    /**
     * Generate a unique ID for a plan item
     */
    const getItemId = useCallback((item: TripPlanItem): string => {
        return `${item.type}-${item.timestamp || Date.now()}-${JSON.stringify(item.data).slice(0, 50)}`;
    }, []);

    /**
     * Add a new plan item (with deduplication)
     */
    const addItem = useCallback((item: TripPlanItem) => {
        const itemId = getItemId(item);

        if (displayedIds.has(itemId)) {
            console.log('Plan item already displayed:', itemId);
            return;
        }

        displayedIds.add(itemId);

        setItems(prev => {
            const newItems = [...prev, item];
            // Limit to maxItems to prevent memory issues
            if (newItems.length > maxItems) {
                return newItems.slice(-maxItems);
            }
            return newItems;
        });
    }, [getItemId, displayedIds, maxItems]);

    /**
     * Clear all items
     */
    const clearItems = useCallback(() => {
        setItems([]);
        displayedIds.clear();
    }, [displayedIds]);

    /**
     * Get all current items (for external use)
     */
    const getItems = useCallback(() => items, [items]);

    // Memoize sorted items by priority if available
    const sortedItems = useMemo(() => {
        return [...items].sort((a, b) => {
            // Sort by priority if available, lower number = higher priority
            const priorityA = a.priority ?? 999;
            const priorityB = b.priority ?? 999;
            return priorityA - priorityB;
        });
    }, [items]);

    return (
        <div className={`plan-items-container ${className}`}>
            {sortedItems.length === 0 ? (
                <p className="text-center text-gray-500 py-8">
                    Your trip plan will appear here as it&apos;s being built...
                </p>
            ) : (
                sortedItems.map((item, index) => (
                    <PlanItemCard
                        key={`${item.type}-${item.timestamp || index}`}
                        item={item}
                    />
                ))
            )}
        </div>
    );
}

/**
 * Hook to use plan items container imperatively
 */
export function usePlanItems() {
    const [items, setItems] = useState<TripPlanItem[]>([]);
    const displayedIdsRef = React.useRef<Set<string>>(new Set());

    const getItemId = useCallback((item: TripPlanItem): string => {
        return `${item.type}-${item.timestamp || Date.now()}`;
    }, []);

    const addItem = useCallback((item: TripPlanItem) => {
        const itemId = getItemId(item);

        if (displayedIdsRef.current.has(itemId)) {
            return false;
        }

        displayedIdsRef.current.add(itemId);
        setItems(prev => [...prev, item]);
        return true;
    }, [getItemId]);

    const clearItems = useCallback(() => {
        setItems([]);
        displayedIdsRef.current.clear();
    }, []);

    return {
        items,
        addItem,
        clearItems,
        itemCount: items.length,
    };
}

export default PlanItemsContainer;
