pub mod field;

use serde::{Deserialize, Serialize};
use thiserror::Error;

pub enum ClipError {
    #[error("invalid password: {0}")]
    InvalidPassword(String),
    #[error("invalid title: {0}")]
    InvalidTitle(String),
    #[error("no content")]
    EmpyContent,
    #[error("invalid date: {0}")]
    InvalidDate(String),
    #[error("date parsing error: {0}")]
    DateParse(#[from] chrono::ParseError),
    #[error("id error: {0}")]
    Id(#[from] uuid::Error),
    #[error("hits error: {0}")]
    Hits(#[from] std::num::TryFromIntError)
}

#[derive(Debug, Clone, Deserialize, Serialize)]
pub struct Clip {
    pub clip_id: field::ClipId,
    pub shortcode: field::ShortCode,
    pub content: field::Content,
    pub title: field::Title,
    pub posted: field::Posted,
    pub expires: field::Expires,
    pub password: field::Password,
    pub hits: field::Hits
}
