'use client'

import style from "./style.module.scss"
import Button from "../Button/"
import Tag from "@/components/ui/Tag"        

export default function ResourceCard({ resource, onViewClick }) {
    const maxTagsToShow = 3;

    const imageUrl = resource?.icon || '';
    const title = resource?.title || '';
    const description = resource?.tagline || resource?.descriptionPlainText || '';

    const tags = [];
    if (resource?.resourceType) {
        tags.push(resource.resourceType.toUpperCase());
    }
    if (resource?.categoryTags && resource.categoryTags.length > 0) {
        tags.push(...resource.categoryTags.slice(0, maxTagsToShow - 1));
    }
    
    return (
        <div className={style.cardWrapper}>
            <div className={style.componentCard}>
                
                <div className={style.imageContainer}>
                    {imageUrl ? (
                        <img src={imageUrl} alt={title} className={style.image} />
                    ) : (
                        <div className={`${style.image} ${style.imagePlaceholder}`}></div>
                    )}
                </div>

                <div className={style.content}>
                    <h2 className={style.title}>{title}</h2>
                    <p className={style.description}>{description}</p>

                    <div className={style.tags}>
                        {tags.slice(0, maxTagsToShow).map((tag, index) => (
                            <Tag
                                key={index}
                                variant={index === 0 ? 'dark' : 'light'}
                            >
                                {tag}
                            </Tag>
                        ))}
                        {tags.length > maxTagsToShow && <Tag variant="light">...</Tag>}
                    </div>
                </div>
                <Button cta={true} onClick={onViewClick}>
                        VIEW
                </Button>
            </div>
        </div>
    );
}